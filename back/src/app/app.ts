import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
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
  private authService = inject(AuthService);
  private dataMigrationService = inject(DataMigrationService);
  private router = inject(Router);

  async ngOnInit(): Promise<void> {
    console.log('🚀 Iniciando aplicación...');
    
    // Esperar un momento para que Firebase se inicialice
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Migrar datos de la carpeta data a Firebase si está vacío
    await this.dataMigrationService.migrateDataIfEmpty();
    
    // Esperar a que el estado de autenticación se resuelva
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Verificar si el usuario está autenticado
    if (this.authService.isAuthenticated()) {
      console.log('✅ Usuario autenticado');
      // Usuario autenticado, redirigir a home si está en login
      if (this.router.url === '/login') {
        this.router.navigate(['/']);
      }
    } else {
      console.log('❌ Usuario no autenticado');
      // Si no está autenticado, redirigir a login si no está ya ahí
      if (this.router.url !== '/login') {
        console.log('🔄 Redirigiendo a login...');
        this.router.navigate(['/login']);
      }
    }
  }
}
