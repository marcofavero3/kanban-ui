import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskRequest, TaskResponse, MoveTaskRequest } from '../../shared/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly API_URL = 'http://localhost:8080/boards';

  constructor(private http: HttpClient) {}

  findAll(boardId: string, columnId: string): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(`${this.API_URL}/${boardId}/columns/${columnId}/tasks`);
  }

  create(boardId: string, columnId: string, request: TaskRequest): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(
      `${this.API_URL}/${boardId}/columns/${columnId}/tasks`,
      request,
    );
  }

  update(
    boardId: string,
    columnId: string,
    taskId: string,
    request: TaskRequest,
  ): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(
      `${this.API_URL}/${boardId}/columns/${columnId}/tasks/${taskId}`,
      request,
    );
  }

  move(boardId: string, taskId: string, request: MoveTaskRequest): Observable<TaskResponse> {
    return this.http.patch<TaskResponse>(
      `${this.API_URL}/${boardId}/tasks/${taskId}/move`,
      request,
    );
  }

  delete(boardId: string, columnId: string, taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }
}
