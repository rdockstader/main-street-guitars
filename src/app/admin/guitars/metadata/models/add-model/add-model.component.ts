import { MakesService } from './../../makes/makes.service';
import { Make } from './../../makes/make.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModelsService } from '../models.service';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css']
})
export class AddModelComponent implements OnInit {
  modelForm: FormGroup;

  constructor(private modelsService: ModelsService, private makesService: MakesService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.modelForm = new FormGroup({
      model: new FormControl(null),
      make: new FormControl(null)
    });
  }

  onSubmit() {
    this.modelsService.AddModel(this.modelForm.value.model);
    this.modelForm.reset();
  }

}
