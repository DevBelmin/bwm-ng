import { RentalService } from './../shared/rental.service';
import { Rental } from './../rental';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bwm-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {

  rentals : Rental[];

  constructor(private rentalService: RentalService) { }

  ngOnInit() {
    this.rentalService.getRentals().subscribe(
      (rentals: Rental[])=> {
        this.rentals = rentals;
      },
      (error) => {
        console.log('App Error: Error occured while trying to get rentals.');
      }
    )
  }
}
