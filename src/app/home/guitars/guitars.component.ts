import { Guitar } from './guitar.model';
import { GuitarService } from './guitar.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-guitars',
  templateUrl: './guitars.component.html',
  styleUrls: ['./guitars.component.css']
})
export class GuitarsComponent implements OnInit {
  guitars$: Observable<Guitar[]>;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.guitars$ = this.store.select(fromRoot.getFilteredGuitars);
  }

}
