import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GuitarsComponent } from './guitars/guitars.component';
import { GuitarDetailsComponent } from './guitars/guitar-details/guitar-details.component';
import { HomeComponent } from './home.component';
import { GuitarsFiltersComponent } from './guitars/guitars-filters/guitars-filters.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeFeaturedComponent } from './home-featured/home-featured.component';
import { HomeFeaturedCardComponent } from './home-featured/home-featured-card/home-featured-card.component';


@NgModule({
  declarations: [
    GuitarsComponent,
    GuitarDetailsComponent,
    HomeComponent,
    GuitarsFiltersComponent,
    HomeHeaderComponent,
    HomeFeaturedComponent,
    HomeFeaturedCardComponent
  ],
  imports: [
    SharedModule
  ],
  exports: []
})
export class HomeModule {}
