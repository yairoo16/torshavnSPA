import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {
  coordinates: any;
  constructor() { }

  public watchCurrentPosition(): Observable<Position> {
    return new Observable<Position>(
      (observer) => {
      navigator.geolocation.watchPosition(
        (pos: Position) => {
          observer.next(pos);
        },
        () => {
          console.log('Position is not available');
        },
        {
          enableHighAccuracy: true
        }
      );
    });
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
