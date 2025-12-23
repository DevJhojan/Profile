import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthInitService } from '../../services/auth-init.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  constructor(
    private authService: AuthService,
    private router: Router,
    private authInitService: AuthInitService
  ) {}

  async ngOnInit(): Promise<void> {
    // Intentar autenticación automática con credentials_personal.json
    this.isLoading.set(true);
    const result = await this.authInitService.initializeUser();
    this.isLoading.set(false);
    
    if (result.success) {
      // Si la autenticación automática fue exitosa, redirigir
      this.router.navigate(['/']);
    } else {
      // Si falla, cargar credenciales en el formulario si están disponibles
      await this.loadCredentialsToForm();
    }
  }

  private async loadCredentialsToForm(): Promise<void> {
    try {
      const response = await fetch('/credentials_personal.json');
      if (response.ok) {
        const credentials = await response.json();
        this.email = credentials.email || '';
        this.password = credentials.password || '';
      }
    } catch (error) {
      // Ignorar errores, simplemente no cargar credenciales
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.email || !this.password) {
      this.errorMessage.set('Por favor, complete todos los campos');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const result = await this.authService.login(this.email, this.password);

    if (result.success) {
      this.router.navigate(['/']);
    } else {
      this.errorMessage.set(result.error || 'Error al iniciar sesión');
    }

    this.isLoading.set(false);
  }
}

