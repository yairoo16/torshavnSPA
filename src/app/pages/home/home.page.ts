import { Component, OnInit} from '@angular/core';
import { Coordinates } from 'src/app/models/location';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  latitude = 62.009;
  longitude = -6.771;
  markers = [];

  pointsOfInterest: Array<Coordinates> = [
    {lat: 62.006847, lng: -6.778328},
    {lat: 62.0065247, lng: -6.7847653},
    {lat: 62.0057391, lng: -6.7817612}
  ];

  // form: FormGroup;
  constructor() {

    // this.authService.authUserObservable.subscribe(jwt => {
    //   if (jwt) {
    //     const decoded = jwtHelper.decodeToken(jwt);
    //     this.user = decoded.sub;
    //   } else {
    //     this.user = null;
    //   }
    // });

  }

  ngOnInit(): void {

    // this.form = new FormGroup({
    //   location: new FormControl(null, {validators: [Validators.required]})
    // });
  }

  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }


}
