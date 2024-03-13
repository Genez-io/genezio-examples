import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserResponse, UserService } from '@genezio-sdk/todo-list-ts';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor() {}

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<CreateUserResponse> {
    return UserService.register(name, email, password);
  }
}
