import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'todo-list';
  constructor(private router: Router) {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.navigationEnd();
      }
    });
  }
  navigationEnd() {
    this.router.navigate(['all-tasks']);
  }
}
