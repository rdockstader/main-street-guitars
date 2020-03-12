import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Model } from './model.model';
import { UIService } from './../../../../shared/ui.service';

import * as fromRoot from '../../../../app.reducer';
import * as Metadata from '../metadata.actions';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  private modelsCollectionName = 'models';
  constructor(private uiService: UIService,
              private store: Store<fromRoot.State>,
              private db: AngularFirestore) {
  }

  FetchModels() {
    this.db
    .collection(this.modelsCollectionName)
    .snapshotChanges()
    .pipe(map(docArray => {
      return docArray.map(doc => {
        return new Model(doc.payload.doc.id,
                        doc.payload.doc.data()['Value'],
                        doc.payload.doc.data()['AddDate'].toDate());
      });
    })).subscribe((models: Model[]) => {
      console.log(models);
      this.store.dispatch(new Metadata.SetModels(models));
    });
  }

  AddModel(value: string) {
    this.db.collection(this.modelsCollectionName).add({Value: value, AddDate: new Date()}).then(() => {
      this.uiService.showSnackbar('Model Added!');
      this.FetchModels();
    }).catch(err => {
      console.log(err);
      this.uiService.showSnackbar('Failed to add model!');
    });
  }

  RemoveModel(ModelID: string) {
    this.db.collection(this.modelsCollectionName).doc(ModelID).delete().then(() => {
      this.uiService.showSnackbar('Model Removed!');
      this.FetchModels();
    }).catch(err => {
      console.log(err);
      this.uiService.showSnackbar('Failed to remove make!');
    });
  }
}
