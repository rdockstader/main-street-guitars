import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { AdminGuitarsComponent } from './admin/guitars/guitars.component';
import { UsersComponent } from './admin/users/users.component';
import { AdminComponent } from './admin/admin.component';
import { MetadataComponent } from './admin/guitars/metadata/metadata.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [
      AuthGuard,
      AdminGuard
    ],
    children: [
    {path: 'guitars', component: AdminGuitarsComponent},
    {path: 'guitars/metadata', component: MetadataComponent},
    {path: 'users', component: UsersComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard]
})
export class AppRoutingModule { }
