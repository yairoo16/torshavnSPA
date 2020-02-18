import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';
import { GeoLocationService } from 'src/app/services/geo-location.service';
import { Coordinates } from 'src/app/models/location';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // currentPosition: Coordinates;
  watchId: any;
  navigationExtras: NavigationExtras;

  constructor(private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private authService: AuthService,
              private toastCtrl: ToastController,
              private geoLocationService: GeoLocationService) {
  }

  ngOnInit() {

  }

  signup() {
    this.navCtrl.navigateRoot(['register']);
  }

  async login(value: any) {


    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Logging in ...'
    });

    loading.present();

    this.geoLocationService.getCurrentLocation().subscribe(
      (pos: Position) => {
        const currentPosition: Coordinates = {
          lat: 0,
          lng: 0
        };

        currentPosition.lat = +(pos.coords.latitude);
        currentPosition.lng = +(pos.coords.longitude);

        console.log('Lat:' + currentPosition.lat + ' Long:' + currentPosition.lng  + ' accuracy: ' + pos.coords.accuracy );
        this.navigationExtras = {
          state: {
            coordinates: currentPosition
          }
        };
        this.authService
        .login(value)
        .pipe(finalize(() => loading.dismiss()))
        .subscribe(
          _ => {
            this.navCtrl.navigateRoot(['home'], this.navigationExtras);
          },
          err => this.handleError(err));
      }
    );
  }

  async  handleError(error: any) {
    let message: string;
    if (error.status && error.status === 401) {
      message = 'Login failed';
    } else {
      message = `Unexpected error: ${error.statusText}`;
    }

    const toast = await this.toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }

  async getCurrentlocation() {
    this.watchId = this.geoLocationService.getCurrentLocation().subscribe(
      (pos: Position) => {
        const currentPosition: Coordinates = {
          lat: 0,
          lng: 0
        };

        currentPosition.lat = +(pos.coords.latitude);
        currentPosition.lng = +(pos.coords.longitude);

        console.log('Lat:' + currentPosition.lat + ' Long:' + currentPosition.lng  + ' accuracy: ' + pos.coords.accuracy );
        this.navigationExtras = {
          state: {
            coordinates: currentPosition
          }
        };
      }
    );
  }

}
