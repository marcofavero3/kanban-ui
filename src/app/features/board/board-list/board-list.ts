import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BoardService } from '../../../core/services/board';
import { AuthService } from '../../../core/services/auth';
import { BoardResponse } from '../../../shared/models/board.model';
import { BoardDialog } from '../../../shared/components/board-dialog/board-dialog';

@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  templateUrl: './board-list.html',
  styleUrl: './board-list.scss',
})
export class BoardList implements OnInit {
  boards = signal<BoardResponse[]>([]);
  loading = signal(true);

  constructor(
    private boardService: BoardService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadBoards();
  }

  loadBoards(): void {
    this.loading.set(true);
    this.boardService.findAll().subscribe({
      next: (boards) => {
        this.boards.set(boards);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.snackBar.open('Erro ao carregar boards', 'Fechar', { duration: 3000 });
      },
    });
  }

  openBoard(id: string): void {
    this.router.navigate(['/boards', id]);
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(BoardDialog, {
      width: '480px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boardService.create(result).subscribe({
          next: (board) => {
            this.boards.update((boards) => [...boards, board]);
            this.snackBar.open('Board criado com sucesso!', 'Fechar', { duration: 3000 });
          },
          error: () => {
            this.snackBar.open('Erro ao criar board', 'Fechar', { duration: 3000 });
          },
        });
      }
    });
  }

  deleteBoard(id: string, event: Event): void {
    event.stopPropagation();
    this.boardService.delete(id).subscribe({
      next: () => {
        this.boards.update((boards) => boards.filter((b) => b.id !== id));
        this.snackBar.open('Board removido', 'Fechar', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Erro ao remover board', 'Fechar', { duration: 3000 });
      },
    });
  }

  logout(): void {
    this.authService.logout();
  }

  get userName(): string {
    return this.authService.currentUser()?.name || '';
  }
}
