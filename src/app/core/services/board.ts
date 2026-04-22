import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BoardRequest, BoardResponse } from '../../shared/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private readonly API_URL = 'http://localhost:8080/boards';

  constructor(private http: HttpClient) {}

  findAll(): Observable<BoardResponse[]> {
    return this.http.get<BoardResponse[]>(this.API_URL);
  }

  findById(id: string): Observable<BoardResponse> {
    return this.http.get<BoardResponse>(`${this.API_URL}/${id}`);
  }

  create(request: BoardRequest): Observable<BoardResponse> {
    return this.http.post<BoardResponse>(this.API_URL, request);
  }

  update(id: string, request: BoardRequest): Observable<BoardResponse> {
    return this.http.put<BoardResponse>(`${this.API_URL}/${id}`, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
