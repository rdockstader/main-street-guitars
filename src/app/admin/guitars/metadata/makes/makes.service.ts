import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

import { Make } from './make.model';
import { UIService } from 'src/app/shared/ui.service';

import * as Metadata from '../metadata.actions';
import * as fromRoot from '../../../../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class MakesService {
  private nextMakeID = 8;
  constructor(private uiService: UIService, private store: Store<fromRoot.State>) {}

  AddMake(value: string) {
    this.store.select(fromRoot.getMakes).pipe(take(1)).subscribe(makes => {
      const newMakeID = this.nextMakeID++;
      makes.push(new Make('' + newMakeID, value, new Date()));
      this.store.dispatch(new Metadata.SetMakes([...makes]));
      this.uiService.showSnackbar('Make Added!');
    });
  }

  RemoveMake(MakeID: string) {
    this.store.select(fromRoot.getMakes).pipe(take(1)).subscribe(makes => {
      const index = makes.findIndex(make => make.makeID === MakeID);
      if (index >= 0) {
        makes.splice(index, 1);
        this.store.dispatch(new Metadata.SetMakes([...makes]));
        this.uiService.showSnackbar('Make Removed!');
      } else {
        this.uiService.showSnackbar('Invalid MakeID: ' + MakeID);
      }
    });
  }
}
