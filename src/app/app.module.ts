import { ShareDialogComponent } from './home/guitars/shareDialog.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

import { AuthService } from './auth/auth.service';
import { GuitarService } from './home/guitars/guitar.service';

import { reducers } from './app.reducer';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    ShareDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AuthModule,
    AdminModule,
    HomeModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [
    AuthService,
    GuitarService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ShareDialogComponent]
})
export class AppModule { }
