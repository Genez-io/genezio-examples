import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerFailed: boolean = false;
  registerFailedMsg?: string = '';

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  submitRegister(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      this.registerFailed = true;
      this.registerFailedMsg = 'All fields are mandatory';
      return;
    }

    this.registerService.register(name, email, password).then((res) => {
      if (!res.success) {
        this.registerFailed = true;
        if (res.msg) {
          this.registerFailedMsg = res.msg;
        } else {
          if (res.err) {
            this.registerFailedMsg = 'Unexpected error: ' + res.err;
          } else {
            this.registerFailedMsg =
              'Unexpected error: Please check the backend logs in the project dashboard - https://app.genez.io.';
          }
        }
        return;
      }

      this.router.navigate(['login']);
    });
  }
}
