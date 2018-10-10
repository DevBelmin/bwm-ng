import { Rental } from './../rental';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RentalService {

  rentals : Rental[] = [
    {
      id: 1,
      title: 'Central Apartment',
      city: 'New York',
      street: 'Time Square',
      category: 'apartment',
      image: 'http://via.placeholder.com/350x250',
      beadrooms: 3,
      description: 'Very nice apartment',
      dailyRate: 35,
      shared: false,
      createdAt: '24/12/2017'
    },
    {
      id: 2,
      title: 'Small Apartment',
      city: 'San Franciso',
      street: 'Random street 10',
      category: 'apartment',
      image: 'http://via.placeholder.com/350x250',
      beadrooms: 1,
      description: 'Small and cheep place to stay',
      dailyRate: 20,
      shared: false,
      createdAt: '07/12/2017'
    },
    {
      id: 3,
      title: 'Just outside the city centar apartment',
      city: 'Portland',
      street: 'Main street 33b',
      category: 'apartment',
      image: 'http://via.placeholder.com/350x250',
      beadrooms: 2,
      description: 'Modern furnished flat',
      dailyRate: 33,
      shared: false,
      createdAt: '16/11/2017'
    },
    {
      id: 4,
      title: 'Big bussines apartment',
      city: 'New York',
      street: 'Time Square 88c',
      category: 'apartment',
      image: 'http://via.placeholder.com/350x250',
      beadrooms: 4,
      description: 'Modern and in city center',
      dailyRate: 76,
      shared: false,
      createdAt: '13/12/2017'
    }
  ];

  constructor() { }

  getRentals() : Observable<Rental[]> {

    return new Observable((observer) => {
      
      setTimeout(() => {
        observer.next(this.rentals)
      }, 2000)

    });
  }

  getRentalById(rentalId: string) : Observable<Rental> {

    return new Observable<Rental>((observer) => {

      setTimeout(() => {
        const selectedRental: Rental = this.rentals.find((rental)=> {
          return rental.id === +rentalId
        });

        observer.next(selectedRental);

      }, 500)
    })
  }
}
