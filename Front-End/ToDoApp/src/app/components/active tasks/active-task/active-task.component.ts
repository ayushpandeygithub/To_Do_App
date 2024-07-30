import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TaskService } from '../../../services/task-service/task.service';
import { Task } from '../../../models/task.model';
import { AddTaskModalComponent } from '../../add task/add-task-modal/add-task-modal.component';
import { Subscription } from 'rxjs';
import { DeleteConfirmationModalComponent } from '../../../core/common/delete-confirmation-modal/delete-confirmation-modal.component';
import { ToastService } from '../../../services/toast-service/toast-service.service';

@Component({
  selector: 'app-active-task',
  standalone: true,
  imports: [DatePipe, CommonModule, AddTaskModalComponent,DeleteConfirmationModalComponent],
  templateUrl: './active-task.component.html',
  styleUrl: './active-task.component.css',
})
export class ActiveTaskComponent implements OnInit {
  currentDate = new Date();
  taskToDelete : number = 0;
  tasks : Task[] = [];
  isDeleteModalOpen = false;
  formattedDate: string;
  taskToedit: Task = {
    taskName: '',
    taskDescription: '',
    IsCompleted: false,
    IsDeleted: false,
  };
  isModalOpen = false;
  dataSubscription!: Subscription;
  constructor(private datePipe: DatePipe, private taskService: TaskService , private toastService : ToastService) {
    this.formattedDate = this.datePipe.transform(
      this.currentDate,
      'EEEE dd MMMM yyyy'
    )!;
  }
  ngOnInit(): void {
    this.getAllActiveTasks();
    this.dataSubscription = this.taskService.dataChanged$.subscribe(() => {
      this.getAllActiveTasks();
    });
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  toggleTaskCompletion(task: Task): void {
    this.taskService.toggleTaskStatus(task.taskId!).subscribe(() => {
      this.getAllActiveTasks();
    });
  }

  
  handleDeleteConfirmation(confirmed: boolean) {
    if(confirmed){
     this.taskService.deleteTask(this.taskToDelete).subscribe(()=>{
      this.toastService.showToast("Task deleted Sucessfully", 'success',true);
     });
    }
    this.isDeleteModalOpen = false;
   }
   
   openDeleteModal(taskId : number){
     this.taskToDelete = taskId;
     this.isDeleteModalOpen = true;
   }
   
  getAllActiveTasks() {
    this.taskService.getActiveTasksForUser().subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }
  editTask(task: Task) {
    this.taskToedit = task;
  }
  timeDuration(createdDate: string): string {
    return this.taskService.getAddedTimeDuration(
      new Date(Date.parse(createdDate))
    );
  }
}
