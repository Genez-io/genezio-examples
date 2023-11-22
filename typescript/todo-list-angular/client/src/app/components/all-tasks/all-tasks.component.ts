import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { Task } from '@genezio-sdk/todo-list-ts_us-east-1';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css'],
})
export class AllTasksComponent {
  allTasks: Task[] = [];
  dbError: String = '';

  constructor(
    private modalService: NgbModal,
    private tasksService: TasksService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.tasksService.error$.subscribe((error: any) => {
      this.dbError = error;
    });
    this.tasksService.getTasks().then((res) => {
      if (res.success) {
        this.allTasks = res.tasks;
      } else {
        if (res.err) {
          this.tasksService.setError(res.err);
        } else {
          this.tasksService.setError(
            'Unexpected error: Please check the backend logs in the project dashboard - https://app.genez.io.'
          );
        }
      }
    });
  }

  openModal(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        if (!result) {
          return;
        }

        this.tasksService.createTask(result).then((res) => {
          if (res.success) {
            this.allTasks.push(res.task!);
          } else {
            if (res.err) {
              this.tasksService.setError(res.err);
            } else {
              this.tasksService.setError(
                'Unexpected error: Please check the backend logs in the project dashboard - https://app.genez.io.'
              );
            }
          }
        });
      });
  }

  taskDeleted(id: string) {
    this.allTasks = this.allTasks.filter(function (task) {
      return task._id !== id;
    });
  }

  logout() {
    this.authService.logout();
  }
}
