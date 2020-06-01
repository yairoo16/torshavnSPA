import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {
  coordinates: any;
  watchId: any;
  constructor() { }

  public watchCurrentPosition(): Observable<Position> {
    return new Observable<Position>(
      (observer) => {
        if (navigator.geolocation) {
          this.watchId = navigator.geolocation.watchPosition(
            (pos: Position) => {
                observer.next(pos);
              },
              (error) => {
                console.log('Position is not available: ' + error.message);
              },
              {
                enableHighAccuracy: true,
                timeout: 10000
              }
            );
        }
      },
    );
  }

  public getCurrentLocation(): Observable<Position> {
    return new Observable<Position>(
      (observer) => {
        navigator.geolocation.getCurrentPosition(
          (pos: Position) => {
            observer.next(pos);
          },
          (error) => {
            observer.next(null);
          },
          {
            enableHighAccuracy: true
          }
        );
      });
  }

  // pubilc stopWatchingCurrentPosition() {
  //   navigator.geolocation.clearWatch();
  // }
}
