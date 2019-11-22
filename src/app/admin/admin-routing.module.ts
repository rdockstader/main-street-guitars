import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { AdminGuitarsComponent } from './guitars/guitars.component';
import { MetadataComponent } from './guitars/metadata/metadata.component';
import { AddGuitarComponent } from './guitars/add-guitar/add-guitar.component';


const routes: Routes = [
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
    {path: 'guitars/add', component: AddGuitarComponent},
    {path: 'guitars/edit/:id', component: AddGuitarComponent}
  ]}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
