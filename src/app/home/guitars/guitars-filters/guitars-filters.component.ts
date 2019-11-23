import { Store } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { GuitarService } from './../guitar.service';

import { GuitarFilter } from './../guitarFilter.model';
import { Make } from './../../../admin/guitars/metadata/makes/make.model';
import { Model } from 'src/app/admin/guitars/metadata/models/model.model';

import * as fromRoot from '../../../app.reducer';

@Component({
  selector: 'app-guitars-filters',
  templateUrl: './guitars-filters.component.html',
  styleUrls: ['./guitars-filters.component.css']
})
export class GuitarsFiltersComponent implements OnInit {
  guitarFilterForm: FormGroup;
  makes$: Observable<Make[]>;
  models$: Observable<Model[]>;


  constructor(private guitarService: GuitarService,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.makes$ = this.store.select(fromRoot.getMakes);
    this.models$ = this.store.select(fromRoot.getModels);
    this.initForm();
  }

  private initForm() {
    this.guitarFilterForm = new FormGroup({
      makes: new FormControl(null),
      models: new FormControl(null),
      lowestPrice: new FormControl(null),
      highestPrice: new FormControl(null),
    });
  }

  onSubmit() {
    const guitarFilter: GuitarFilter = {
      ...this.guitarFilterForm.value
    };
    this.guitarService.filterGuitars(guitarFilter);
  }

  onReset() {
    this.guitarFilterForm.reset();
    this.guitarService.filterGuitars(null);
  }

}
