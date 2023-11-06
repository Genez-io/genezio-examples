import { Injectable } from '@angular/core';
import { DeleteTaskResponse, GetTaskResponse, GetTasksResponse, TaskService } from '@genezio-sdk/todo-list-ts_us-east-1'
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private authService: AuthService) { }

  async createTask(title: string): Promise<GetTaskResponse> {
    var userId = this.authService.getUser()._id
    return TaskService.createTask(this.authService.getAuthToken(), title, userId)
  }

  async getTasks(): Promise<GetTasksResponse> {
    var userId = this.authService.getUser()._id
    return TaskService.getAllTasksByUser(this.authService.getAuthToken(), userId)
  }

  async deleteTask(id: string): Promise<DeleteTaskResponse> {
    return TaskService.deleteTask(this.authService.getAuthToken(), id)
  }

  async updateTask(id: string, title: string, solved: boolean) {
    return TaskService.updateTask(this.authService.getAuthToken(), id, title, solved)
  }
}
