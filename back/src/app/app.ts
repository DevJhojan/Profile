import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthInitService } from './services/auth-init.service';
import { AuthService } from './services/auth.service';

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
  private router = inject(Router);

  async ngOnInit(): Promise<void> {
    // Intentar autenticación automática al iniciar
    const result = await this.authInitService.initializeUser();
    
    if (result.success) {
      // Usuario autenticado, redirigir a home si está en login
      if (this.router.url === '/login') {
        this.router.navigate(['/']);
      }
    } else {
      // Si falla, redirigir a login si no está autenticado
      if (!this.authService.isAuthenticated() && this.router.url !== '/login') {
        this.router.navigate(['/login']);
      }
    }
  }
}
