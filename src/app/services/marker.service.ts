import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Marker } from '../models/marker';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private httpClient: HttpClient) { }

  getMarkers(): Observable<Marker[]> {
    return this.httpClient.get<Marker[]>(`${environment.serverURL}/marker/historicmarkers`);
  }
}
