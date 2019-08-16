import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {
  coordinates: any;
  constructor() { }

  public getPosition(): Observable<Position> {
    return new Observable<Position>(
      (observer) => {
      navigator.geolocation.watchPosition(
        (pos: Position) => {
          observer.next(pos);
        },
        (error) => {
          observer.next(null);
        },
        {
          enableHighAccuracy: true,
          // timeout: 5000
        }
      );
    });
  }
}
