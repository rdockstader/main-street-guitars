import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

import { Model } from './model.model';
import { UIService } from './../../../../shared/ui.service';

import * as fromRoot from '../../../../app.reducer';
import * as Metadata from '../metadata.actions';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  private nextModelID = 6;
  constructor(private uiService: UIService,
                     private store: Store<fromRoot.State>) {
  }
  AddModel(value: string) {
    this.store.select(fromRoot.getModels).pipe(take(1)).subscribe(models => {
      const newModelID = this.nextModelID++;
      models.push(new Model(newModelID, value, new Date()));
      this.store.dispatch(new Metadata.SetModels([...models]));
      this.uiService.showSnackbar('Model Added!');
    });
  }

  RemoveModel(ModelID: number) {
    this.store.select(fromRoot.getModels).pipe(take(1)).subscribe(models => {
      const index = models.findIndex(model => model.modelID === ModelID);
      if (index >= 0) {
        models.splice(index, 1);
        this.store.dispatch(new Metadata.SetModels([...models]));
        this.uiService.showSnackbar('Model Removed!');
      } else {
        this.uiService.showSnackbar('Invalid MakeID: ' + ModelID);
      }
    });
  }
}
