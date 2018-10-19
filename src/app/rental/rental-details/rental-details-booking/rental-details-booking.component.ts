import { Component, OnInit, Input } from '@angular/core';
import { Rental } from '../../rental';

@Component({
  selector: 'bwm-rental-details-booking',
  templateUrl: './rental-details-booking.component.html',
  styleUrls: ['./rental-details-booking.component.scss']
})
export class RentalDetailsBookingComponent implements OnInit {

  @Input() rental: Rental;

  daterange: any = {};

  // can also be setup using the config service to apply to multiple pickers
  options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
    opens: 'left'
  };

  constructor() { }

  ngOnInit() {
  }

  public selectedDate(value: any, datepicker?: any) {
    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // or manupulat your own internal property
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }
}
