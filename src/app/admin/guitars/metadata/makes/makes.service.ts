import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Make } from './make.model';
import { UIService } from 'src/app/shared/ui.service';

import * as Metadata from '../metadata.actions';
import * as fromRoot from '../../../../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class MakesService {
  private nextMakeID = 8;
  private makesCollectionName = 'makes';
  constructor(private uiService: UIService, private store: Store<fromRoot.State>, private db: AngularFirestore) {}

  FetchMakes() {
    this.db
    .collection(this.makesCollectionName)
    .snapshotChanges()
    .pipe(map(docArray => {
      return docArray.map(doc => {
        return new Make(doc.payload.doc.id,
                        doc.payload.doc.data()['Value'],
                        doc.payload.doc.data()['AddDate'].toDate());
      });
    })).subscribe((makes: Make[]) => {
      console.log(makes);
      this.store.dispatch(new Metadata.SetMakes(makes));
    });
  }

  AddMake(value: string) {
    this.db.collection(this.makesCollectionName).add({Value: value, AddDate: new Date()}).then(() => {
      this.uiService.showSnackbar('Make Added!');
      this.FetchMakes();
    }).catch(err => {
      console.log(err);
      this.uiService.showSnackbar('Failed to add make!');
    });
  }

  RemoveMake(id: string) {
    this.db.collection(this.makesCollectionName).doc(id).delete().then(() => {
      this.uiService.showSnackbar('Make Removed!');
      this.FetchMakes();
    }).catch(err => {
      console.log(err);
      this.uiService.showSnackbar('Failed to remove make!');
    });
  }
}
