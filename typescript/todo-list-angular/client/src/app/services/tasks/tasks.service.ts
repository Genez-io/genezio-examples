import { Injectable } from '@angular/core';
import {
  DeleteTaskResponse,
  GetTaskResponse,
  GetTasksResponse,
  TaskService,
} from '@genezio-sdk/todo-list-ts';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private errorSubject = new BehaviorSubject<string | null>(null);
  error$ = this.errorSubject.asObservable();

  constructor() {}

  setError(error: string | null): void {
    this.errorSubject.next(error);
  }

  async createTask(title: string): Promise<GetTaskResponse> {
    return TaskService.createTask(title);
  }

  async getTasks(): Promise<GetTasksResponse> {
    return TaskService.getAllTasks();
  }

  async deleteTask(id: string): Promise<DeleteTaskResponse> {
    return TaskService.deleteTask(id);
  }

  async updateTask(id: string, title: string, solved: boolean) {
    return TaskService.updateTask(id, title, solved);
  }
}
