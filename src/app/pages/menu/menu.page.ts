import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      title: 'First Page',
      url: '/menu/first'
    },
    {
      title: 'Second Page',
      url: '/menu/second'
    }
  ];

  selectedPath = '';

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
  }

}
