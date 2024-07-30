export interface Task {
    taskName: string;
    taskDescription: string;
    createdDate?: string; 
    modifiedDate?: string;
    IsCompleted: boolean;
    IsDeleted: boolean;
    taskId?: number;
    userId?: number;
  }
  