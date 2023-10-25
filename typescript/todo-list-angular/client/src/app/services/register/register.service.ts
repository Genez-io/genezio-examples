import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserResponse, UserService } from '@genezio-sdk/todo-list-ts_us-east-1'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  async register(name: string, email: string, password: string): Promise<CreateUserResponse> {
    return UserService.register(name, email, password)
  }
}
