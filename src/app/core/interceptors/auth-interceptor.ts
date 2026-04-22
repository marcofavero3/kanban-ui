import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // Pega o token do localStorage
  const token = localStorage.getItem('accessToken');

  // Se tem token, clona a requisicao adicionando o header Authorization
  const authReq = token
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      // Se receber 401 (nao autorizado), token expirou
      // Limpa o storage e redireciona para o login
      if (error.status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }),
  );
};
