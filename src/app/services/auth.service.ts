import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly jwtTokenName = 'jwt_token';

  private authUser = new ReplaySubject<any>(1);
  public authUserObservable = this.authUser.asObservable();

  constructor(private httpClient: HttpClient,
              private navCtrl: NavController,
              private jwtHelper: JwtHelperService) { }

  getIsLoggedIn() {
    const token = localStorage.getItem('jwt_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  get token() {
    return localStorage.getItem('jtw_token');
  }

  login(values: any): Observable<string> {
    return this.httpClient.post(`${environment.serverURL}login`, values, {responseType: 'text'})
      .pipe(tap(jwt => {
        this.handleJwtResponse(jwt);
      }
    ));
  }

  logout() {
    localStorage.removeItem(this.jwtTokenName);
    this.authUser.next(null);
    this.navCtrl.navigateRoot('login', {replaceUrl: true});
  }

  signup(values: any): Observable<string> {
    // return this.httpClient.post(`${environment.serverURL}/register`, values);
    return this.httpClient.post(`${environment.serverURL}register`, values, {responseType: 'text'})
      .pipe(tap(jwt => {
        if (jwt !== 'EXISTS') {
          return this.handleJwtResponse(jwt);
        }
        return jwt;
      }));
  }

  private handleJwtResponse(jwt: string): string {
    const jwtObject = JSON.parse(jwt);
    const tokenValue = jwtObject['token'];

    localStorage.setItem(this.jwtTokenName, tokenValue);
    this.authUser.next(jwt);

    return jwt;
  }
}
