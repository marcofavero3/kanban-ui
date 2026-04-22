import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'boards',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
  },
  {
    path: 'boards',
    canActivate: [authGuard],
    loadComponent: () => import('./features/board/board-list/board-list').then((m) => m.BoardList),
  },
  {
    path: 'boards/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/board/board-detail/board-detail').then((m) => m.BoardDetail),
  },
  {
    path: '**',
    redirectTo: 'boards',
  },
];
