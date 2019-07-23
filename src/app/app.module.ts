import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import {JwtModule} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationPickerComponent } from './shared/pickers/location-picker/location-picker.component';
import { MapModalComponent } from './shared/pickers/map-modal/map-modal.component';

export function tokenGetter() {
  return localStorage.getItem('jwt_token');
}

@NgModule({
  declarations: [
    AppComponent,
    MapModalComponent
  ],
  entryComponents: [
    MapModalComponent
  ],
  imports: [BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    JwtModule.forRoot({
      config: {
        // tslint:disable-next-line: object-literal-shorthand
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.whitelistedDomains
      }
    }),
    AppRoutingModule,
    ReactiveFormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
