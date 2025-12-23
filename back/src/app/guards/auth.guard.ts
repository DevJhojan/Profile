import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { take, filter } from 'rxjs/operators';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Esperar un momento para que la autenticación se complete
  // (máximo 3 segundos)
  let attempts = 0;
  const maxAttempts = 30; // 30 intentos de 100ms = 3 segundos
  
  while (authService.isLoading() && attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 100));
    attempts++;
  }

  // Verificar si está autenticado
  const isAuth = authService.isAuthenticated();
  console.log('AuthGuard - isAuthenticated:', isAuth, 'isLoading:', authService.isLoading());
  
  if (isAuth) {
    return true;
  } else {
    console.log('AuthGuard - Redirigiendo a login');
    router.navigate(['/login']);
    return false;
  }
};

