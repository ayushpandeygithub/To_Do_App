import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task-service/task.service';
import { Task } from '../../../models/task.model';
import { ToastService } from '../../../services/toast-service/toast-service.service';
@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.css',
})
export class AddTaskModalComponent  {
  @Input() defaultData: Task = {
    taskName: '',
    taskDescription: '',
    IsCompleted: false,
    IsDeleted: false,
  };
  @Input() isOpen = false;
  @Input() isUpdate = false;
  @Output() close = new EventEmitter<void>();
  title = '';
  description = '';
  constructor(private taskService: TaskService , private toastService : ToastService) {}

  ngOnChanges() {
    this.title = this.defaultData.taskName;
    this.description = this.defaultData.taskDescription;
  }
  
  closeModal() {
    this.close.emit();
  }

  addTask() {
    if (this.title.trim() && this.description.trim()) {
      debugger
      this.taskService
        .addTask({
          taskName: this.title,
          taskDescription: this.description,
          IsDeleted: false,
          IsCompleted: false,
        })
        .subscribe(() => {
          this.closeModal();
          this.toastService.showToast("Task added Sucessfully", 'success',true);
        });
    }
    this.title = '';
    this.description = '';
  }
  updateTask() {
    let updatedTask: Task = {
      taskId: this.defaultData.taskId,
      taskName: this.title,
      taskDescription: this.description,
      IsCompleted: this.defaultData.IsCompleted,
      IsDeleted: this.defaultData.IsCompleted,
    };
    if (!!updatedTask.taskId)
      this.taskService
        .updateTask(updatedTask.taskId, updatedTask)
        .subscribe(() => {
          this.closeModal();
          this.toastService.showToast("Task updated Sucessfully", 'success',true);
        });
  }
  handelSubmission(){
    if (this.isUpdate) {
      this.updateTask();
    } else {
      this.addTask();
  }
}
}
