import { MapService } from './../map.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AgmMap } from '@agm/core';

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @ViewChild(AgmMap)
  public agmMap: AgmMap

  @Input() streetAddress: string;
  
  lat: number;
  lng: number;

  constructor(private mapService: MapService) { }

  ngOnInit() {
  }

  onMapReady() {
    this.mapService.codeAddress(this.streetAddress)
      .subscribe((geoCodedAddress) => {

        this.lat = +geoCodedAddress[0].geometry.location.lat();
        this.lng = +geoCodedAddress[0].geometry.location.lng();

        this.agmMap.latitude = this.lat;
        this.agmMap.longitude = this.lng;
        this.agmMap.triggerResize();
      })
  }

}