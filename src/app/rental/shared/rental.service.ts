import { Rental } from './../rental';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment'

@Injectable()
export class RentalService {

  //rentals : Rental[];

  constructor(private httpClient: HttpClient) { }

  getRentals() : Observable<Rental[]> {
    return <Observable<Rental[]>>this.httpClient.get(`${environment.baseApi}/api/v1/rentals`);
  }

  getRentalById(rentalId: string) : Observable<Rental> {
    return <Observable<Rental>>this.httpClient.get(`${environment.baseApi}/api/v1/rentals/${rentalId}`);
  }
}