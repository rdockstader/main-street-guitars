import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { GuitarsComponent } from './guitars/guitars.component';
import { GuitarDetailsComponent } from './guitars/guitar-details/guitar-details.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HomeComponent } from './home/home.component';
import { GuitarsFiltersComponent } from './guitars/guitars-filters/guitars-filters.component';
import { HomeHeaderComponent } from './home/home-header/home-header.component';
import { HomeFeaturedComponent } from './home/home-featured/home-featured.component';
import { HomeFeaturedCardComponent } from './home/home-featured/home-featured-card/home-featured-card.component';
import { GuitarsHeaderComponent } from './guitars/guitars-header/guitars-header.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuitarsComponent } from './admin/guitars/guitars.component';
import { MetadataComponent } from './admin/guitars/metadata/metadata.component';
import { UsersComponent } from './admin/users/users.component';
import { ModelsComponent } from './admin/guitars/metadata/models/models.component';
import { MakesComponent } from './admin/guitars/metadata/makes/makes.component';
import { AddMakeComponent } from './admin/guitars/metadata/makes/add-make/add-make.component';
import { AddModelComponent } from './admin/guitars/metadata/models/add-model/add-model.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    GuitarsComponent,
    GuitarDetailsComponent,
    HeaderComponent,
    SidenavListComponent,
    HomeComponent,
    GuitarsFiltersComponent,
    HomeHeaderComponent,
    HomeFeaturedComponent,
    HomeFeaturedCardComponent,
    GuitarsHeaderComponent,
    AdminComponent,
    AdminGuitarsComponent,
    MetadataComponent,
    UsersComponent,
    ModelsComponent,
    MakesComponent,
    AddMakeComponent,
    AddModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
