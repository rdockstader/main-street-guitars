import { ShareDialogComponent } from './shareDialog.component';
import { UIService } from './../../shared/ui.service';
import { Guitar } from './guitar.model';
import { GuitarService } from './guitar.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-guitars',
  templateUrl: './guitars.component.html',
  styleUrls: ['./guitars.component.css']
})
export class GuitarsComponent implements OnInit {
  guitars$: Observable<Guitar[]>;

  constructor(private store: Store<fromRoot.State>,
              private uiService: UIService,
              private dialog: MatDialog,
              private guitarService: GuitarService) { }

  ngOnInit() {
    this.guitarService.fetchGuitars();
    this.guitars$ = this.store.select(fromRoot.getFilteredGuitars);
  }

  onLike(guitar: Guitar, event) {
    if (event.srcElement.innerText === 'LIKE') {
      event.srcElement.innerText = 'LIKED';
      this.uiService.showSnackbar('You liked the ' + guitar.make + ' ' + guitar.model);
    } else {
      event.srcElement.innerText = 'LIKE';
      this.uiService.showSnackbar('You Removed your like from the ' + guitar.make + ' ' + guitar.model);
    }
  }

  onShare(guitar: Guitar, event) {
    const dialogRef = this.dialog.open(ShareDialogComponent, {data: {guitar}});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let messasge = 'You would have sent your friend this guitar, if this was a ';
        messasge += 'production website! Thanks for sharing!';
        this.uiService.showSnackbar(messasge);
      }
    });
  }

}
