import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Task } from '../../models/task.model'; 
import { ApiService } from '../../core/service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskUrl = '/tasks';
  private dataChangeSubject: Subject<void> = new Subject<void>();
  dataChanged$: Observable<void> = this.dataChangeSubject.asObservable();

  constructor(private apiService: ApiService) {}

  getCompletedTasksForUser(): Observable<Task[]> {
    return this.apiService.get<Task[]>(this.fetchTaskEndpoint(`/completed-tasks`)).pipe(
      map(response => {
       if (response && response.status == 1)  {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getActiveTasksForUser(): Observable<Task[]> {
    return this.apiService.get<Task[]>(this.fetchTaskEndpoint(`/active-tasks`)).pipe(
      map(response => {
       if (response && response.status == 1)  {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  addTask(task: Task): Observable<Task> {
    return this.apiService.post<Task>(this.fetchTaskEndpoint(``), task).pipe(
      map(response => {
       if (response && response.status == 1)  {
          this.dataChangeSubject.next();
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  updateTask(taskId: number, task: Task): Observable<Task> {
    return this.apiService.put<Task>(this.fetchTaskEndpoint(`/${taskId}/update`), task).pipe(
      map(response => {
        if (response && response.status == 1) {
          this.dataChangeSubject.next();
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  deleteTask(taskId: number): Observable<void> {
    return this.apiService.delete<void>(this.fetchTaskEndpoint(`/${taskId}/delete`)).pipe(
      map(response => {
        if (response && response.status == 1) {
          this.dataChangeSubject.next();
        }
      })
    );
  }

  toggleTaskStatus(taskId: number): Observable<void> {
    return this.apiService.put<void>(this.fetchTaskEndpoint(`/${taskId}/toggle-task-status`), null).pipe(
      map(response => {
       if (response && response.status)  {
          this.dataChangeSubject.next();
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getAddedTimeDuration(createdDate: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(createdDate).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

    if (minutes < 60) {
      return `Added ${minutes} minutes ago`;
    } else if (hours < 24) {
      return `Added ${hours} hours ago`;
    } else if (days < 7) {
      return `Added ${days} days ago`;
    } else if (weeks < 4) {
      return `Added ${weeks} weeks ago`;
    } else if (months < 12) {
      return `Added ${months} months ago`;
    } else {
      return `Added ${years} years ago`;
    }
  }

  fetchTaskEndpoint(endpointPostfix:string)
  {
    return `${this.taskUrl}${endpointPostfix}`
  }
}


