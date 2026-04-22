import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BoardColumnRequest, BoardColumnResponse } from '../../shared/models/column.model';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  private readonly API_URL = 'http://localhost:8080/boards';

  constructor(private http: HttpClient) {}

  findAll(boardId: string): Observable<BoardColumnResponse[]> {
    return this.http.get<BoardColumnResponse[]>(`${this.API_URL}/${boardId}/columns`);
  }

  create(boardId: string, request: BoardColumnRequest): Observable<BoardColumnResponse> {
    return this.http.post<BoardColumnResponse>(`${this.API_URL}/${boardId}/columns`, request);
  }

  update(
    boardId: string,
    columnId: string,
    request: BoardColumnRequest,
  ): Observable<BoardColumnResponse> {
    return this.http.put<BoardColumnResponse>(
      `${this.API_URL}/${boardId}/columns/${columnId}`,
      request,
    );
  }

  delete(boardId: string, columnId: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${boardId}/columns/${columnId}`);
  }
}
