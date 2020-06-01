import { Component, OnInit} from '@angular/core';
import { Coordinates } from 'src/app/models/location';
import { Marker } from 'src/app/models/marker';
import { environment } from 'src/environments/environment';
import { MarkerService } from 'src/app/services/marker.service';
import { GeoLocationService } from 'src/app/services/geo-location.service';
import { ActivatedRoute, Router } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  map: any;
  s3BaseImageUrl = environment.s3Url;
  lat: number;
  lng: number;
  currentLocationMarker = 'http://www.robotwoods.com/dev/misc/bluecircle.png';
  watchId: any;
  // currentLocationMarker: any;
  origin: any;
  directions: any[] = [];
  zoom = 15;

  pointsOfInterest: Marker[];
  selectedPointOfInterest: Marker;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private markerService: MarkerService,
              private geoLocationService: GeoLocationService) {


  }

  ngOnInit(): void {
    this.watchCurrentLocation();
    this.populateMarkers();
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

  getCurrentlocation() {
    this.watchId = this.geoLocationService.getCurrentLocation().subscribe(
      (pos: Position) => {
        this.lat = +(pos.coords.latitude);
        this.lng = +(pos.coords.longitude);
        console.log('Lat:' + this.lat + ' Long:' + this.lng + ' accuracy: ' + pos.coords.accuracy );
      }
    );
  }

  // watchCurrentLocation() {
  //   if (navigator.geolocation) {
  //       this.watchId = navigator.geolocation.watchPosition(
  //         (pos: Position) => {
  //           this.lat = +(pos.coords.latitude);
  //           this.lng = +(pos.coords.longitude);
  //           console.log('Lat:' + this.lat + ' Long:' + this.lng + ' accuracy: ' + pos.coords.accuracy + ' timestamp: ' + Date.now());
  //         },
  //         () => {
  //           console.log('Position is not available');
  //         },
  //         {
  //           enableHighAccuracy: true
  //         }
  //       );
  //     }
  // }

  watchCurrentLocation() {
    this.watchId = this.geoLocationService.watchCurrentPosition().subscribe(
      (pos: Position) => {
        this.lat = +(pos.coords.latitude);
        this.lng = +(pos.coords.longitude);
        console.log('Lat:' + this.lat + ' Long:' + this.lng + ' accuracy: ' + pos.coords.accuracy + ' timestamp: ' + Date.now());
      }
    );
  }

  recenterMap() {
    console.log('recenter map is clicked');
    this.getCurrentlocation();
  }

  // meant to center location
  // resetCurrentLocation() {
  //   this.geoLocationService.resetCurrentLocation().subscribe(
  //     (pos: Position) => {
  //       this.startLat = +(pos.coords.latitude);
  //       this.startLng = +(pos.coords.longitude);
  //       console.log('Lat:' + this.currentLat + ' Long:' + this.currentLng + ' accuracy: ' + pos.coords.accuracy );
  //     }
  //   );
  // }

  getRoute(event) {
    if (this.directions.length === 0) {
      this.directions.push({
        origin: { lat: this.lat, lng: this.lng },
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

  // mapReady(event: any) {
  //   // this.currentLocationMarker = google.maps.SymbolPath.CIRCLE;
  //   // this.watchCurrentLocation();
  //   this.map = event;
  //   // const input = document.getElementById('Map-Search');
  //   // this.searchBox = new google.maps.places.SearchBox(input);
  //   this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(document.getElementById('Settings'));
  // }

  centerChanged() {
    console.log('Center changed');

  }

}
