import { GuitarService } from './../guitar.service';
import { GuitarFilter } from './../guitarFilter.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Make } from './../../../admin/guitars/metadata/makes/make.model';
import { ModelsService } from './../../../admin/guitars/metadata/models/models.service';
import { MakesService } from './../../../admin/guitars/metadata/makes/makes.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Model } from 'src/app/admin/guitars/metadata/models/model.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-guitars-filters',
  templateUrl: './guitars-filters.component.html',
  styleUrls: ['./guitars-filters.component.css']
})
export class GuitarsFiltersComponent implements OnInit, OnDestroy {
  guitarFilterForm: FormGroup;
  makes: Make[] = [];
  models: Model[] = [];
  makesSub: Subscription;
  modelsSub: Subscription;

  constructor(private makesService: MakesService,
              private modelsService: ModelsService,
              private guitarService: GuitarService) { }

  ngOnInit() {
    this.models = this.modelsService.getModels();
    this.modelsSub = this.modelsService.modelsChanged.subscribe(() => {
      this.models = this.modelsService.getModels();
    });
    this.makes = this.makesService.getMakes();
    this.makesSub = this.makesService.makesChanged.subscribe(() => {
      this.makes = this.makesService.getMakes();
    });
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

  ngOnDestroy() {
    if (this.makesSub) {
      this.makesSub.unsubscribe();
    }
    if (this.modelsSub) {
      this.modelsSub.unsubscribe();
    }
  }

}
