import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { Task } from '@genezio-sdk/todo-list-ts_us-east-1'

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent {

  allTasks: Task[] = []

  constructor(private modalService: NgbModal, private tasksService: TasksService, private authService: AuthService) {
  }

  ngOnInit() {
    this.tasksService.getTasks().then(res => {
      this.allTasks = res.tasks
    })
  }

  openModal(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
        if (!result) {
          return
        }

        this.tasksService.createTask(result).then(res => {
          this.allTasks.push(res.task!)
        })
      }
		);
	}

  taskDeleted(id: string) {
    this.allTasks = this.allTasks.filter(function(task) {
      return task._id !== id;
    });
  }

  logout() {
    this.authService.logout()
  }
}
