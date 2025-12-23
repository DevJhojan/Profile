import { Component, signal, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

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

  async onSubmit(): Promise<void> {
    if (!this.email || !this.password) {
      this.errorMessage.set('Por favor, complete todos los campos');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    // Pequeño delay para evitar rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));

    const result = await this.authService.login(this.email, this.password);

    if (result.success) {
      this.router.navigate(['/']);
    } else {
      this.errorMessage.set(result.error || 'Error al iniciar sesión');
    }

    this.isLoading.set(false);
  }
}

