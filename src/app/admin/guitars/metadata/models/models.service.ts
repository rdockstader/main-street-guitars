import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

import { Model } from './model.model';
import { Make } from '../makes/make.model';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  public modelsChanged = new Subject<void>();
  private models: Model[] = [];
  private nextModelID = 1;
  constructor(private snackBar: MatSnackBar) {
  }

  getModels() {
    return [...this.models];
  }

  AddModel(value: string, make: Make) {
    const newModelID = this.nextModelID++;

    this.models.push(new Model(newModelID, value, make, new Date()));
    this.modelsChanged.next();
    this.snackBar.open('Model Added!', null, {
      duration: 3000
    });
  }

  RemoveModel(ModelID: number) {
    const index = this.models.findIndex(model => model.modelID === this.nextModelID);
    if (index >= 0) {
      this.models.splice(index, 1);
      this.modelsChanged.next();
      this.snackBar.open('Make Removed!',  null, {
        duration: 3000
      });
    } else {
      this.snackBar.open('Invalid MakeID: ' + ModelID, null, {
        duration: 3000
      });
    }
  }
}
