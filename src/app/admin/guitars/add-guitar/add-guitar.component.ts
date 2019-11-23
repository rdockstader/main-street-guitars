import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { GuitarService } from './../../../home/guitars/guitar.service';
import { Guitar } from './../../../home/guitars/guitar.model';
import { ModelsService } from './../metadata/models/models.service';
import { MakesService } from './../metadata/makes/makes.service';
import { Model } from './../metadata/models/model.model';
import { Make } from './../metadata/makes/make.model';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../app.reducer';
import * as Ui from '../../../shared/ui.actions';


@Component({
  selector: 'app-add-guitar',
  templateUrl: './add-guitar.component.html',
  styleUrls: ['./add-guitar.component.css']
})
export class AddGuitarComponent implements OnInit, OnDestroy {
  addGuitarForm: FormGroup;
  makes$: Observable<Make[]>;
  models$: Observable<Model[]>;
  id: string;
  guitar: Guitar;
  ID_PARAM = 'id';
  editMode = false;

  routeSubscription: Subscription;

  constructor(private guitarSerice: GuitarService,
              private route: ActivatedRoute,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.store.dispatch(new Ui.StartLoading());
    this.routeSubscription = this.route.params.subscribe(
      (parentParams: Params) => {
        this.id = parentParams[this.ID_PARAM];
        if (this.id) {
          this.store.select(fromRoot.getGuitars).subscribe(guitars => {
            this.guitar = guitars.find(g => g.id === this.id);
            this.editMode = true;
            this.store.dispatch(new Ui.StopLoading());
            this.initForm();
          });
        } else {
          this.store.dispatch(new Ui.StopLoading());
        }
      }
    );
    this.makes$ = this.store.select(fromRoot.getMakes);
    this.models$ = this.store.select(fromRoot.getModels);
    this.initForm();

  }

  private initForm() {
    let make = '';
    let model = '';
    let subModel = '';
    let color = '';
    let imageUrl = '';
    let description = '';
    let price = 0;
    if (this.guitar) {
      make = this.guitar.make;
      model = this.guitar.model;
      subModel = this.guitar.subModel;
      color = this.guitar.color;
      imageUrl = this.guitar.imageUrl;
      description = this.guitar.description;
      price = this.guitar.price;
    }
    this.addGuitarForm = new FormGroup({
      make: new FormControl(make, Validators.required),
      model: new FormControl(model, Validators.required),
      subModel: new FormControl(subModel, Validators.required),
      color: new FormControl(color, Validators.required),
      imageUrl: new FormControl(imageUrl, Validators.required),
      description: new FormControl(description, Validators.required),
      price: new FormControl(price, Validators.required)
    });
  }

  onSubmit() {
    const guitar: Guitar = {
        id: this.id,
        addDate: (this.guitar) ? this.guitar.addDate : null,
        ...this.addGuitarForm.value
    };
    if (!this.editMode) {
      this.guitarSerice.addGuitar(guitar);
      this.addGuitarForm.reset();
    } else {
      this.guitarSerice.updateguitar(guitar);
    }
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}
