import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { GuitarService } from './../../../home/guitars/guitar.service';
import { Guitar } from './../../../home/guitars/guitar.model';
import { ModelsService } from './../metadata/models/models.service';
import { MakesService } from './../metadata/makes/makes.service';
import { Model } from './../metadata/models/model.model';
import { Make } from './../metadata/makes/make.model';


@Component({
  selector: 'app-add-guitar',
  templateUrl: './add-guitar.component.html',
  styleUrls: ['./add-guitar.component.css']
})
export class AddGuitarComponent implements OnInit, OnDestroy {
  addGuitarForm: FormGroup;
  makes: Make[] = [];
  models: Model[] = [];
  id: string;
  guitar: Guitar;
  ID_PARAM = 'id';
  editMode = false;

  routeSubscription: Subscription;

  constructor(private makesService: MakesService,
              private modelsService: ModelsService,
              private guitarSerice: GuitarService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(
      (parentParams: Params) => {
        this.id = parentParams[this.ID_PARAM];
        if (this.id) {
          this.guitar = this.guitarSerice.getGuitar(this.id);
          this.editMode = true;
        }
      }
    );
    this.makes = this.makesService.getMakes();
    this.models = this.modelsService.getModels();
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
