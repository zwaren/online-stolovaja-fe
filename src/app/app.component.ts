import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'online-stolovaja-fe';

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  token: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.token.subscribe(x => this.token = x);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }

}
