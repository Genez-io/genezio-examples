import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserLoginResponse } from '@genezio-sdk/todo-list-ts_us-east-1'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authFailed: boolean = false;
  authFailedMsg?: string = "";

  constructor(private authService: AuthService, private router: Router) {
  }

  submitLogin(email: string, password: string) {
    if (!email || !password) {
      this.authFailed = true;
      this.authFailedMsg = "All fields are mandatory";
      return
    }

    this.authService.auth(email, password).then((response: UserLoginResponse) => {
      if (!response.success) {
        this.authFailed = true;
        this.authFailedMsg = response.msg;
        return;
      }

      this.router.navigate([""])
    })
  }
}
