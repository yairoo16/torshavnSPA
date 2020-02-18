import { Coordinates } from 'src/app/models/location';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { AlertifyService } from '../_service/alertify.service';
import { catchError } from 'rxjs/operators';
import { GeoLocationService } from 'src/app/services/geo-location.service';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
export class PositionResolver implements Resolve<Observable<Position>> {

    constructor(private geoLocationService: GeoLocationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const test = this.geoLocationService.getCurrentLocation();
        return test;
        // if (route.params.id) {
        //     return this.geoLocationService.getCurrentLocation();
        //   } else {
        //     return null;
        //   }
    }
}
