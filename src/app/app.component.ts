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

  user: any;
  status: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.user.subscribe(x => {
      this.user = x;
      if (x) {
        let groups = this.user.groups;
        this.status = groups[groups.length - 1].name;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }

}
