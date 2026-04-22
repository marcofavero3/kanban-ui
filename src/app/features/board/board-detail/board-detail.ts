import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { BoardService } from '../../../core/services/board';
import { ColumnService } from '../../../core/services/column';
import { TaskService } from '../../../core/services/task';
import { BoardResponse } from '../../../shared/models/board.model';
import { BoardColumnResponse } from '../../../shared/models/column.model';
import { TaskResponse } from '../../../shared/models/task.model';

@Component({
  selector: 'app-board-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    DragDropModule,
  ],
  templateUrl: './board-detail.html',
  styleUrl: './board-detail.scss',
})
export class BoardDetail implements OnInit {
  board = signal<BoardResponse | null>(null);
  columns = signal<BoardColumnResponse[]>([]);
  tasks = signal<Map<string, TaskResponse[]>>(new Map());
  loading = signal(true);
  boardId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardService: BoardService,
    private columnService: ColumnService,
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('id')!;
    this.loadBoard();
  }

  loadBoard(): void {
    this.loading.set(true);
    this.boardService.findById(this.boardId).subscribe({
      next: (board) => {
        this.board.set(board);
        this.loadColumns();
      },
      error: () => {
        this.snackBar.open('Erro ao carregar board', 'Fechar', { duration: 3000 });
        this.loading.set(false);
      },
    });
  }

  loadColumns(): void {
    this.columnService.findAll(this.boardId).subscribe({
      next: (columns) => {
        this.columns.set(columns);
        this.loadAllTasks(columns);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  loadAllTasks(columns: BoardColumnResponse[]): void {
    const tasksMap = new Map<string, TaskResponse[]>();
    let loaded = 0;

    if (columns.length === 0) {
      this.loading.set(false);
      return;
    }

    columns.forEach((column) => {
      this.taskService.findAll(this.boardId, column.id).subscribe({
        next: (tasks) => {
          tasksMap.set(column.id, tasks);
          loaded++;
          if (loaded === columns.length) {
            this.tasks.set(tasksMap);
            this.loading.set(false);
          }
        },
        error: () => {
          tasksMap.set(column.id, []);
          loaded++;
          if (loaded === columns.length) {
            this.tasks.set(tasksMap);
            this.loading.set(false);
          }
        },
      });
    });
  }

  getTasksForColumn(columnId: string): TaskResponse[] {
    return this.tasks().get(columnId) || [];
  }

  getColumnIds(): string[] {
    return this.columns().map((c) => c.id);
  }

  onTaskDrop(event: CdkDragDrop<TaskResponse[]>, targetColumn: BoardColumnResponse): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const task = event.container.data[event.currentIndex];
      this.taskService
        .move(this.boardId, task.id, {
          targetColumnId: targetColumn.id,
          position: event.currentIndex,
        })
        .subscribe({
          error: () => {
            this.snackBar.open('Erro ao mover tarefa', 'Fechar', { duration: 3000 });
            this.loadColumns();
          },
        });
    }
  }

  addColumn(): void {
    const title = prompt('Nome da coluna:');
    if (!title?.trim()) return;

    const position = this.columns().length;
    this.columnService.create(this.boardId, { title, position }).subscribe({
      next: (column) => {
        this.columns.update((cols) => [...cols, column]);
        this.tasks.update((map) => {
          const newMap = new Map(map);
          newMap.set(column.id, []);
          return newMap;
        });
      },
      error: () => {
        this.snackBar.open('Erro ao criar coluna', 'Fechar', { duration: 3000 });
      },
    });
  }

  deleteColumn(columnId: string, event: Event): void {
    event.stopPropagation();
    this.columnService.delete(this.boardId, columnId).subscribe({
      next: () => {
        this.columns.update((cols) => cols.filter((c) => c.id !== columnId));
        this.tasks.update((map) => {
          const newMap = new Map(map);
          newMap.delete(columnId);
          return newMap;
        });
      },
      error: () => {
        this.snackBar.open('Erro ao remover coluna', 'Fechar', { duration: 3000 });
      },
    });
  }

  addTask(columnId: string): void {
    const title = prompt('Título da tarefa:');
    if (!title?.trim()) return;

    const position = this.getTasksForColumn(columnId).length;
    this.taskService.create(this.boardId, columnId, { title, position }).subscribe({
      next: (task) => {
        this.tasks.update((map) => {
          const newMap = new Map(map);
          const tasks = [...(newMap.get(columnId) || []), task];
          newMap.set(columnId, tasks);
          return newMap;
        });
      },
      error: () => {
        this.snackBar.open('Erro ao criar tarefa', 'Fechar', { duration: 3000 });
      },
    });
  }

  deleteTask(columnId: string, taskId: string, event: Event): void {
    event.stopPropagation();
    this.taskService.delete(this.boardId, columnId, taskId).subscribe({
      next: () => {
        this.tasks.update((map) => {
          const newMap = new Map(map);
          const tasks = (newMap.get(columnId) || []).filter((t) => t.id !== taskId);
          newMap.set(columnId, tasks);
          return newMap;
        });
      },
      error: () => {
        this.snackBar.open('Erro ao remover tarefa', 'Fechar', { duration: 3000 });
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/boards']);
  }
}
