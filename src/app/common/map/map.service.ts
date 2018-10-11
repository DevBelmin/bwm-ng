import { Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { AgmMap } from '@agm/core';

import { google } from '@google/maps';

@Injectable()
export class MapService {

  private geocoder;

  @ViewChild(AgmMap)
  public agmMap: AgmMap

  constructor() { 
  }

  /**
     * Reverse geocoding by location.
     *
     * Wraps the Google Maps API geocoding service into an observable.
     *
     * @param latLng Location
     * @return An observable of GeocoderResult
     */
    geocode(latLng: google.maps.LatLng): Observable<google.maps.GeocoderResult[]> {
      return Observable.create((observer: Observer<google.maps.GeocoderResult[]>) => {
          // Invokes geocode method of Google Maps API geocoding.
          this.geocoder.geocode({ location: latLng }, (
              (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                  if (status === google.maps.GeocoderStatus.OK) {
                      observer.next(results);
                      observer.complete();
                  } else {
                      console.log('Geocoding service: geocoder failed due to: ' + status);
                      observer.error(status);
                  }
              })
          );
      });
  }

   /**
     * Geocoding service.
     *
     * Wraps the Google Maps API geocoding service into an observable.
     *
     * @param address The address to be searched
     * @return An observable of GeocoderResult
     */
    codeAddress(address: string): Observable<any> {
      this.geocoder = new (<any>window).google.maps.Geocoder;

      return Observable.create((observer: Observer<any>) => {
          // Invokes geocode method of Google Maps API geocoding.
          this.geocoder.geocode({ address: address }, (
              (results: any, status: any) => {
                  if (status) {
                      observer.next(results);
                      observer.complete();
                  } else {
                      console.log(
                          'Geocoding service: geocode was not successful for the following reason: '
                          + status
                      );
                      observer.error(status);
                  }
              })
          );
      });
  }
}
