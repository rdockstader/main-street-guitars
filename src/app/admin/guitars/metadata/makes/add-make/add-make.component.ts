import { MakesService } from './../makes.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Make } from '../make.model';

@Component({
  selector: 'app-add-make',
  templateUrl: './add-make.component.html',
  styleUrls: ['./add-make.component.css']
})
export class AddMakeComponent implements OnInit {
  makeForm: FormGroup;

  constructor(private makesService: MakesService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.makeForm = new FormGroup({
      make: new FormControl(null)
    });
  }

  onSubmit() {
    this.makesService.AddMake(this.makeForm.value.make);
    this.makeForm.reset();
  }

}
