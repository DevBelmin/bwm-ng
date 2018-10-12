import { Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { AgmMap } from '@agm/core';

@Injectable()
export class MapService {

  private geocoder;
  private addressCache: any = {};

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
  geocode(latLng): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      // Invokes geocode method of Google Maps API geocoding.
      this.geocoder.geocode({ location: latLng }, (
        (results, status) => {
          if (status === 'OK') {
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
    const isCached = this.addressCached(address);

    return Observable.create((observer: Observer<any>) => {
      if (isCached) {
        debugger;
        this.getCachedAddress(address, observer);
      }
      else {
        this.geoCodeAddress(address, observer);
      }
    });
  }

  addToAddressCache(key: string, lat: number, lng: number) {
    const coordinates = { lat: lat, lng: lng }
    this.addressCache[key.toUpperCase()] = coordinates;
  }

  addressCached(key: string): boolean {
    return this.addressCache[key.toUpperCase()] !== undefined;
  }

  getCachedAddress(key: string, observer: Observer<any>) {
    const cachedAddress =  this.addressCache[key.toUpperCase()];
    observer.next({ lat: cachedAddress.lat, lng: cachedAddress.lng });
    observer.complete();
  }

  geoCodeAddress(address: string, observer: Observer<any>) {
    this.geocoder = new (<any>window).google.maps.Geocoder;
    // Invokes geocode method of Google Maps API geocoding.
    this.geocoder.geocode({ address: address }, (
      (results, status) => {
        if (status === 'OK') {

          const lat: number = +results[0].geometry.location.lat();
          const lng: number = +results[0].geometry.location.lng();

          this.addToAddressCache(address, lat, lng)

          observer.next({ lat: lat, lng: lng });
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
  }
}