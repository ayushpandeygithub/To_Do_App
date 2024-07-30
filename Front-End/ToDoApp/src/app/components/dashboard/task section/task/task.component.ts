import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Task } from '../../../../models/task.model';
import { TaskService } from '../../../../services/task-service/task.service';
import { forkJoin, Subscription } from 'rxjs';
import { DeleteConfirmationModalComponent } from '../../../../core/common/delete-confirmation-modal/delete-confirmation-modal.component';
import { ToastService } from '../../../../services/toast-service/toast-service.service';
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe,DeleteConfirmationModalComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit {
  currentDate = new Date();
  tasks : Task[] = [];
  isDeleteModalOpen = false;
  formattedDate: string;
  dataSubscription!: Subscription;
  constructor(private datePipe: DatePipe, private taskService: TaskService , private toastService : ToastService) {
    this.formattedDate = this.datePipe.transform(
      this.currentDate,
      'EEEE, dd MMMM yyyy'
    )!;
  }
  ngOnInit(): void {
    this.getAllTask();
    this.dataSubscription = this.taskService.dataChanged$.subscribe(() => {
      this.getAllTask();
    });
  }
  updateCurrentDate() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 100000);
  }

  toggleTaskCompletion(task: Task) {
    debugger
      this.taskService.toggleTaskStatus(task.taskId!).subscribe(() => {
        this.updateStatistics();
        this.getAllTask();
      });
    this.updateStatistics();
  }
  
  handleDeleteConfirmation(confirmed: boolean) {
    if (confirmed) {
      this.tasks.forEach(task => {
        this.taskService.deleteTask(task.taskId!).subscribe(() => {
        });
      });
      this.toastService.showToast("All tasks deleted Sucessfully", 'success',true);
      this.updateStatistics();
    }
    this.isDeleteModalOpen = false;
   }
   
   openDeleteModal(){
     this.isDeleteModalOpen = true;
   }

  updateStatistics() {
    const totalTasks = this.tasks.length;
    const completedTasks = this.tasks.filter((task) => task.IsCompleted).length;
    this.completedPercentage = Math.ceil(
      totalTasks ? (completedTasks / totalTasks) * 100 : 0
    );
    this.activePercentage = Math.floor(
      totalTasks ? ((totalTasks - completedTasks) / totalTasks) * 100 : 0
    );
  }

  completedPercentage = 0;
  activePercentage = 0;

  getAllTask() {
    forkJoin({
      completedTasks: this.taskService.getCompletedTasksForUser(),
      activeTasks: this.taskService.getActiveTasksForUser(),
    }).subscribe(({ completedTasks, activeTasks }) => {
      this.tasks = [...activeTasks, ...completedTasks];
      this.updateStatistics();
    });
  }
}
