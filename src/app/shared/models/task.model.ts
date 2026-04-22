export interface TaskRequest {
  title: string;
  description?: string;
  dueDate?: string;
  position?: number;
}

export interface MoveTaskRequest {
  targetColumnId: string;
  position: number;
}

export interface TaskResponse {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  position: number;
  columnId: string;
  createdAt: string;
  updatedAt: string;
}
