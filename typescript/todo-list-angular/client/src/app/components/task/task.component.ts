import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TasksService } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() solved = false;
  @Input() title = '';
  @Input() id = '';

  @Output() onDelete = new EventEmitter<void>();

  constructor(private tasksService: TasksService) {
  }

  delete() {
    this.tasksService.deleteTask(this.id).then(res => {
      if (res.success) {
        this.onDelete.emit()
      }
    })
  }

  setSolved(solved: boolean) {
    this.tasksService.updateTask(this.id, this.title, solved).then(res => {
      if (res.success) {
        this.solved = solved
      }
    })
  }
}
