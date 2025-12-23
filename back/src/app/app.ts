import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthInitService } from './services/auth-init.service';
import { AuthService } from './services/auth.service';
import { DataMigrationService } from './services/data-migration.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template:`<router-outlet />`,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Profile');
  private authInitService = inject(AuthInitService);
  private authService = inject(AuthService);
  private dataMigrationService = inject(DataMigrationService);
  private router = inject(Router);

  async ngOnInit(): Promise<void> {
    console.log('🚀 Iniciando aplicación...');
    
    // Esperar un momento para que Firebase se inicialice
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Migrar datos de la carpeta data a Firebase si está vacío
    await this.dataMigrationService.migrateDataIfEmpty();
    
    // Intentar autenticación automática al iniciar
    console.log('🔐 Intentando autenticación automática...');
    const result = await this.authInitService.initializeUser();
    console.log('📋 Resultado autenticación:', result);
    
    // Esperar un momento más para que el estado se actualice
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (result.success) {
      console.log('✅ Autenticación exitosa, redirigiendo...');
      // Usuario autenticado, redirigir a home si está en login
      if (this.router.url === '/login') {
        this.router.navigate(['/']);
      }
    } else {
      console.log('❌ Autenticación fallida:', result.message);
      // Si falla, redirigir a login si no está autenticado
      if (!this.authService.isAuthenticated() && this.router.url !== '/login') {
        console.log('🔄 Redirigiendo a login...');
        this.router.navigate(['/login']);
      }
    }
  }
}
