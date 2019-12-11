import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GuitarsComponent } from './guitars/guitars.component';
import { HomeComponent } from './home.component';
import { GuitarsFiltersComponent } from './guitars/guitars-filters/guitars-filters.component';
import { HomeHeaderComponent } from './home-header/home-header.component';


@NgModule({
  declarations: [
    GuitarsComponent,
    HomeComponent,
    GuitarsFiltersComponent,
    HomeHeaderComponent
  ],
  imports: [
    SharedModule
  ],
  exports: []
})
export class HomeModule {}
