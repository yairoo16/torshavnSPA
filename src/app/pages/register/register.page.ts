import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { NgModel } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  @ViewChild('username')
  usernameModel: NgModel;

  constructor(private navCtrl: NavController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
}

  ngOnInit() {
  }

  async signup(value: any) {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Signing up ...'
    });

    loading.present();

    this.authService
      .signup(value)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(
        jwt => {
          this.navCtrl.navigateRoot(['home'], { replaceUrl: true });
          this.showSuccesToast(jwt);
        },
        err => this.handleError(err));
        // jwt => this.showSuccesToast(jwt),
        // err => this.handleError(err));
  }

  async handleError(error: any) {
    const message = 'Unexpected error occurred';

    const toast = await this.toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }

  private async showSuccesToast(jwt) {
    if (jwt !== 'EXISTS') {
      const toast = await this.toastCtrl.create({
        message: 'Sign up successful',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
      this.navCtrl.navigateRoot(['home'], {replaceUrl: true});
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Username already registered',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();

      this.usernameModel.control.setErrors({usernameTaken: true});
    }
}

}
