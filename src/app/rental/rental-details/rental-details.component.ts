import { RentalService } from './../shared/rental.service';
import { Rental } from './../rental';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bwm-rental-details',
  templateUrl: './rental-details.component.html',
  styleUrls: ['./rental-details.component.scss']
})
export class RentalDetailsComponent implements OnInit {

  //rentalId: number;
  rental: Rental;

  constructor(private activatedRoute: ActivatedRoute, private rentalService: RentalService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      //this.rentalId = +params['rentalId'];

      this.getRental(params['rentalId']);

    });
  }

  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId)
      .subscribe((rental)=> {
        this.rental = rental;
      })
  }
}
