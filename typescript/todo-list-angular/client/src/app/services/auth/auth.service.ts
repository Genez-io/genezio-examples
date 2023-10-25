import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserLoginResponse, UserService } from '@genezio-sdk/todo-list-ts_us-east-1'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated: boolean = false;

  constructor(private router: Router) {
    this.checkToken().then(result => {
      if (!result) {
        this.logout();
      } else {
        this.authenticated = true;
      }
    })
  }

  isAuthenticated(): boolean {
    return this.authenticated || localStorage.getItem("apiToken") != undefined;
  }

  async checkToken(): Promise<boolean> {
    const apiToken = localStorage.getItem("apiToken");
    if (!apiToken) {
      return false;
    }

    const res = await UserService.checkSession(apiToken);
    if (!res.success) {
      return false;
    }

    return true;
  }

  async auth(email: string, password: string): Promise<UserLoginResponse> {
    const response = await UserService.login(email, password);
    if (response.success) {
      localStorage.setItem("apiToken", response.token!);
      localStorage.setItem("user", JSON.stringify(response.user));
    }
    return response;
  }

  getUser(): User {
    var lsUser = JSON.parse(localStorage.getItem("user")!)
    return {
      _id: lsUser._id,
      email: lsUser.email,
      name: lsUser.name
    }
  }

  getAuthToken(): string {
    return localStorage.getItem("apiToken")!
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["login"])
  }
}
