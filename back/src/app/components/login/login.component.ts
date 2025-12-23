import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  email = '';
  password = '';
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);
  waitTimeRemaining = signal<number>(0); // Tiempo restante en segundos
  private countdownInterval: any = null;
  private readonly WAIT_TIME_SECONDS = 300; // 5 minutos (300 segundos)

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    // Verificar si ya está autenticado
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.clearCountdown();
  }

  private startCountdown(): void {
    this.clearCountdown();
    this.waitTimeRemaining.set(this.WAIT_TIME_SECONDS);
    
    this.countdownInterval = setInterval(() => {
      const remaining = this.waitTimeRemaining();
      if (remaining > 0) {
        this.waitTimeRemaining.set(remaining - 1);
      } else {
        this.clearCountdown();
        // Limpiar el mensaje de error cuando el tiempo expire
        if (this.errorMessage().includes('Muchos intentos')) {
          this.errorMessage.set('');
        }
      }
    }, 1000);
  }

  private clearCountdown(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  async onSubmit(): Promise<void> {
    if (!this.email || !this.password) {
      this.errorMessage.set('Por favor, complete todos los campos');
      return;
    }

    // No permitir submit si hay tiempo de espera activo
    if (this.waitTimeRemaining() > 0) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    // Pequeño delay para evitar rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));

    const result = await this.authService.login(this.email, this.password);

    if (result.success) {
      this.clearCountdown();
      this.router.navigate(['/']);
    } else {
      this.errorMessage.set(result.error || 'Error al iniciar sesión');
      
      // Si es error de too-many-requests, iniciar el contador
      if (result.error?.includes('Muchos intentos')) {
        this.startCountdown();
      }
    }

    this.isLoading.set(false);
  }
}

