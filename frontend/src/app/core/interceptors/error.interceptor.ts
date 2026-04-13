import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Redirigir a login si es un error de autorización
        // Podríamos intentar refresh token antes, pero de momento logout directo
        authService.logout();
        router.navigate(['/auth/login']);
      }
      
      const err = error.error?.message || error.statusText;
      return throwError(() => new Error(err));
    })
  );
};
