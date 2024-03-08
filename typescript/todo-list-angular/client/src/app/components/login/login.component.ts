import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserLoginResponse } from '@genezio-sdk/todo-list-ts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  authFailed: boolean = false;
  authFailedMsg?: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  submitLogin(email: string, password: string) {
    if (!email || !password) {
      this.authFailed = true;
      this.authFailedMsg = 'All fields are mandatory';
      return;
    }

    this.authService
      .auth(email, password)
      .then((response: UserLoginResponse) => {
        if (!response.success) {
          this.authFailed = true;
          if (response.msg) {
            this.authFailedMsg = response.msg;
          } else {
            if (response.err) {
              this.authFailedMsg = 'Unexpected error: ' + response.err;
            } else {
              this.authFailedMsg =
                'Unexpected error: Please check the backend logs in the project dashboard - https://app.genez.io.';
            }
          }
          return;
        }

        this.router.navigate(['']);
      });
  }
}
