import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase.config';

interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthInitService {
  private credentialsPath = './credentials_personal.json';

  async initializeUser(): Promise<{ success: boolean; message: string }> {
    try {
      // Intentar leer el archivo de credenciales desde public
      let response: Response;
      try {
        response = await fetch(this.credentialsPath);
      } catch (fetchError) {
        // Intentar con ruta absoluta
        response = await fetch('/credentials_personal.json');
      }
      
      if (!response.ok) {
        console.warn('No se encontró credentials_personal.json, omitiendo inicialización automática');
        return { 
          success: false, 
          message: 'Archivo de credenciales no encontrado' 
        };
      }

      const credentials: Credentials = await response.json();

      if (!credentials.email || !credentials.password) {
        return { 
          success: false, 
          message: 'El archivo credentials_personal.json debe contener email y password' 
        };
      }

      // Intentar iniciar sesión primero
      try {
        await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        console.log('Usuario autenticado exitosamente desde credentials_personal.json');
        return { 
          success: true, 
          message: 'Usuario autenticado exitosamente' 
        };
      } catch (signInError: any) {
        // Si el usuario no existe, intentar registrarlo
        if (signInError.code === 'auth/user-not-found') {
          try {
            await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
            console.log('Usuario registrado exitosamente desde credentials_personal.json');
            return { 
              success: true, 
              message: 'Usuario registrado exitosamente' 
            };
          } catch (registerError: any) {
            console.error('Error al registrar usuario:', registerError);
            return { 
              success: false, 
              message: `Error al registrar usuario: ${registerError.message}` 
            };
          }
        } else {
          // Otro error de autenticación
          console.error('Error al autenticar usuario:', signInError);
          return { 
            success: false, 
            message: `Error de autenticación: ${signInError.message}` 
          };
        }
      }
    } catch (error: any) {
      console.error('Error al inicializar usuario:', error);
      return { 
        success: false, 
        message: `Error: ${error.message}` 
      };
    }
  }
}

