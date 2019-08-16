import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(private readonly authService: AuthService, private router: Router, private alertCtrl: AlertController) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
                if (this.authService.getIsLoggedIn()) {
                  return true;
                }

                // this.notificationService.addNotification(new Notification(NotificationType.error, 'You must be logged in', ''));
                // this.alertCtrl.create({
                //   header: 'Authentication failed',
                //   message: 'You must be logged in for that!',
                //   buttons: ['Okay']
                // })
                // .then(alertEl => alertEl.present());
                this.router.navigate(['/login']);
                return false;
  }

}
