import { UsersComponent } from './admin/users/users.component';
import { MetadataComponent } from './admin/guitars/metadata/metadata.component';
import { AdminGuitarsComponent } from './admin/guitars/guitars.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, children: [
    {path: 'guitars', component: AdminGuitarsComponent},
    {path: 'guitars/metadata', component: MetadataComponent},
    {path: 'users', component: UsersComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
