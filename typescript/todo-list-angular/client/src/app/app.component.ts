import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = "todo-list";
  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.navigationEnd(e.url);
      }
    });
  }
  navigationEnd(url: string) {
    if (
      url !== '/login' &&
      url !== '/register' &&
      !this.authService.isAuthenticated()
    ) {
      this.router.navigate(['login']);
    }
  }
}
