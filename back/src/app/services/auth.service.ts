import { Injectable, signal } from '@angular/core';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  AuthError 
} from 'firebase/auth';
import { auth } from './firebase.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Signal para el usuario autenticado
  currentUser = signal<User | null>(null);
  isAuthenticated = signal<boolean>(false);
  isLoading = signal<boolean>(true);

  constructor(private router: Router) {
    // Observar cambios en el estado de autenticación
    onAuthStateChanged(auth, (user) => {
      this.currentUser.set(user);
      this.isAuthenticated.set(!!user);
      this.isLoading.set(false);
    });
  }

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      this.isLoading.set(true);
      console.log('Intentando iniciar sesión con:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login exitoso:', userCredential.user.email);
      return { success: true };
    } catch (error) {
      const authError = error as AuthError;
      console.error('Error en login:', authError.code, authError.message);
      let errorMessage = 'Error al iniciar sesión';
      
      switch (authError.code) {
        case 'auth/user-not-found':
          errorMessage = 'Usuario no encontrado';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Contraseña incorrecta';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Usuario deshabilitado';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Credenciales inválidas (email o contraseña incorrectos)';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos fallidos. Intenta más tarde';
          break;
        default:
          errorMessage = authError.message || `Error desconocido: ${authError.code}`;
      }
      
      return { success: false, error: errorMessage };
    } finally {
      this.isLoading.set(false);
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }
}

