import { AuthModule } from './../auth/auth.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalService } from './shared/rental.service';
import { RentalDetailsComponent } from './rental-details/rental-details.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MapModule } from './../common/map/map/map.module';
import { AuthGuard } from '../auth/common/auth-guard';


const rentalRoutes: Routes = [
  {
    path: 'rentals',
    component: RentalComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RentalListComponent },
      { path: ':rentalId', component: RentalDetailsComponent },
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rentalRoutes),
    HttpClientModule,
    MapModule,
    AuthModule

  ],
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailsComponent
  ],
  providers: [RentalService, AuthGuard]
})
export class RentalModule { }