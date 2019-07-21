import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user: string;
  message: string;

  constructor(private authService: AuthService,
              jwtHelper: JwtHelperService,
              private httpClient: HttpClient) {

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
    // this.httpClient.get(`${environment.serverURL}/secret`, { responseType: 'text' }).subscribe(
    //   text => this.message = text,
    //   err => console.log(err)
    // );
  }

  logout() {
    this.authService.logout();
  }

}
