import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminGuitarsComponent } from './guitars/guitars.component';
import { MetadataComponent } from './guitars/metadata/metadata.component';
import { ModelsComponent } from './guitars/metadata/models/models.component';
import { MakesComponent } from './guitars/metadata/makes/makes.component';
import { AddMakeComponent } from './guitars/metadata/makes/add-make/add-make.component';
import { AddModelComponent } from './guitars/metadata/models/add-model/add-model.component';
import { AddGuitarComponent } from './guitars/add-guitar/add-guitar.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminGuitarsComponent,
    MetadataComponent,
    ModelsComponent,
    MakesComponent,
    AddMakeComponent,
    AddModelComponent,
    AddGuitarComponent
  ],
  imports: [
    SharedModule
  ],
  exports: []
})
export class AdminModule {}
