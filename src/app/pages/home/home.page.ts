import { Component, OnInit} from '@angular/core';
import { Coordinates } from 'src/app/models/location';
import { Marker } from 'src/app/models/marker';
import { environment } from 'src/environments/environment';
import { MarkerService } from 'src/app/services/marker.service';
import { GeoLocationService } from 'src/app/services/geo-location.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  s3BaseImageUrl = environment.s3Url;
  currentLat: number;
  currentLng: number;
  origin: any;
  directions: any[] = [];
  zoom = 15;

  pointsOfInterest: Marker[];
  selectedPointOfInterest: Marker;

  constructor(private markerService: MarkerService, private geoLocationService: GeoLocationService) {

  }

  ngOnInit(): void {
    this.populateMarkers();
    this.getCurrentLocation();
  }

  populateMarkers() {
    this.markerService.getMarkers().subscribe(m => {
      this.pointsOfInterest = m;
    });
  }

  // onChoseLocation(event) {
  //   this.currentLat = event.coords.lat;
  //   this.currentLng = event.coords.lng;
  // }

  clickedMarker(marker: Marker) {
    console.log(`clicked the marker: ${marker.label || marker.description}`);
    this.selectedPointOfInterest = marker;
  }

  getCurrentLocation() {
    // if (navigator) {
    //   navigator.geolocation.getCurrentPosition( pos => {
    //     this.longitude = +pos.coords.longitude;
    //     this.latitude = +pos.coords.latitude;
    //   });
    // }
    this.geoLocationService.getPosition().subscribe(
      (pos: Position) => {
        this.currentLat = +(pos.coords.latitude);
        this.currentLng = +(pos.coords.longitude);
        console.log('Lat:' + this.currentLat + ' Long:' + this.currentLng + ' accuracy: ' + pos.coords.accuracy );
      }
    );
  }

  getRoute(event) {
    if (this.directions.length === 0) {
      this.directions.push({
        origin: { lat: this.currentLat, lng: this.currentLng },
        destination: { lat: event.coords.lat, lng: event.coords.lng },
        renderOptions: { polylineOptions: { strokeColor: '#f00' } },
      });
    } else {
      const lat = this.directions[this.directions.length - 1].destination.lat;
      const lng = this.directions[this.directions.length - 1].destination.lng;
      this.directions.push({
        origin: { lat: lat, lng: lng },
        destination: { lat: event.coords.lat, lng: event.coords.lng },
        renderOptions: { polylineOptions: { strokeColor: '#f00' } },
      });
    }
  }

}
