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
  latitude = 62.009;
  longitude = -6.771;
  zoom = 15;

  pointsOfInterest: Marker[];
  selectedPointOfInterest: Marker;

  constructor(private markerService: MarkerService) {

  }

  ngOnInit(): void {
    this.populateMarkers();
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


}
