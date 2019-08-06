import { Component, OnInit} from '@angular/core';
import { Coordinates } from 'src/app/models/location';
import { Marker } from 'src/app/models/marker';
import { environment } from 'src/environments/environment';
import { MarkerService } from 'src/app/services/marker.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  s3BaseImageUrl = environment.s3Url;
  latitude: number;
  longitude: number;
  zoom = 15;

  pointsOfInterest: Marker[];
  selectedPointOfInterest: Marker;

  constructor(private markerService: MarkerService) {

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

  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

  clickedMarker(marker: Marker) {
    console.log(`clicked the marker: ${marker.label || marker.description}`);
    this.selectedPointOfInterest = marker;
  }

  getCurrentLocation() {
    if (navigator) {
      navigator.geolocation.getCurrentPosition( pos => {
        this.longitude = +pos.coords.longitude;
        this.latitude = +pos.coords.latitude;
      });
    }
  }

}
