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
      let response: Response | null = null;
      let credentialsPath = '';
      
      // Intentar diferentes rutas
      const paths = [
        '/credentials_personal.json',
        './credentials_personal.json',
        'credentials_personal.json'
      ];
      
      for (const path of paths) {
        try {
          console.log('Intentando leer credenciales desde:', path);
          const tempResponse = await fetch(path);
          if (tempResponse.ok) {
            response = tempResponse;
            credentialsPath = path;
            break;
          }
        } catch (e) {
          console.log('No se pudo leer desde:', path);
          continue;
        }
      }
      
      if (!response || !response.ok) {
        console.warn('❌ No se encontró credentials_personal.json en ninguna ruta');
        return { 
          success: false, 
          message: 'Archivo de credenciales no encontrado' 
        };
      }

      console.log('✅ Archivo encontrado en:', credentialsPath);
      const credentials: Credentials = await response.json();
      console.log('✅ Credenciales leídas, email:', credentials.email);

      if (!credentials.email || !credentials.password) {
        return { 
          success: false, 
          message: 'El archivo credentials_personal.json debe contener email y password' 
        };
      }

      // Intentar iniciar sesión primero
      try {
        console.log('Intentando autenticar con:', credentials.email);
        
        // Pequeño delay para evitar rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
        
        await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        console.log('✅ Usuario autenticado exitosamente desde credentials_personal.json');
        return { 
          success: true, 
          message: 'Usuario autenticado exitosamente' 
        };
      } catch (signInError: any) {
        console.error('❌ Error al autenticar:', signInError.code, signInError.message);
        
        // Si el usuario no existe, intentar registrarlo
        if (signInError.code === 'auth/user-not-found' || signInError.code === 'auth/invalid-credential') {
          console.log('Usuario no encontrado, intentando registrar...');
          try {
            // Delay antes de registrar también
            await new Promise(resolve => setTimeout(resolve, 200));
            await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
            console.log('✅ Usuario registrado exitosamente desde credentials_personal.json');
            return { 
              success: true, 
              message: 'Usuario registrado exitosamente' 
            };
          } catch (registerError: any) {
            console.error('❌ Error al registrar usuario:', registerError.code, registerError.message);
            return { 
              success: false, 
              message: `Error al registrar usuario: ${registerError.message || registerError.code}` 
            };
          }
        } else if (signInError.code === 'auth/too-many-requests') {
          // Si hay demasiados intentos, esperar un poco y reintentar una vez
          console.log('⚠️ Demasiados intentos, esperando antes de reintentar...');
          await new Promise(resolve => setTimeout(resolve, 2000));
          try {
            await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
            console.log('✅ Usuario autenticado exitosamente después de reintento');
            return { 
              success: true, 
              message: 'Usuario autenticado exitosamente' 
            };
          } catch (retryError: any) {
            return { 
              success: false, 
              message: 'Por favor, espera unos minutos antes de intentar nuevamente' 
            };
          }
        } else {
          // Otro error de autenticación
          return { 
            success: false, 
            message: `Error de autenticación: ${signInError.message || signInError.code}` 
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

