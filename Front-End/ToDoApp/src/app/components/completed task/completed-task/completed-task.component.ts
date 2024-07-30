import { Component,OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TaskService } from '../../../services/task-service/task.service';
import { Task } from '../../../models/task.model';
import { CommonModule } from '@angular/common'
import { Subscription } from 'rxjs';
import { DeleteConfirmationModalComponent } from '../../../core/common/delete-confirmation-modal/delete-confirmation-modal.component';
import { ToastService } from '../../../services/toast-service/toast-service.service';
@Component({
  selector: 'app-completed-task',
  standalone: true,
  imports: [DatePipe,CommonModule,DeleteConfirmationModalComponent],
  templateUrl: './completed-task.component.html',
  styleUrl: './completed-task.component.css',
})
export class CompletedTaskComponent implements OnInit {
  currentDate = new Date();
  formattedDate: string;
  taskToDelete : number = 0;
  tasks : Task[] = [];
  isDeleteModalOpen = false;
  dataSubscription! : Subscription;
  constructor(private datePipe: DatePipe , private taskService : TaskService , private toastService : ToastService) {
    this.formattedDate = this.datePipe.transform(
      this.currentDate,
      'EEEE, dd MMMM yyyy'
    )!;
  }
  
  ngOnInit(): void {
    this.getAllCompletedTasks();
    this.dataSubscription = this.taskService.dataChanged$.subscribe(() => {
      this.getAllCompletedTasks();
    });
  }

  toggleTaskCompletion(task: Task): void {
    if(!!task.taskId)
    this.taskService.toggleTaskStatus(task.taskId).subscribe(() => {
      this.getAllCompletedTasks();
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

  getAllCompletedTasks(){
   this.taskService.getCompletedTasksForUser().subscribe(
    (data : Task[])=>{
     this.tasks = data;
    });
  }

  timeDuration(createdDate : string) : string {
    return this.taskService.getAddedTimeDuration(new Date (Date.parse(createdDate)));
  }
}
