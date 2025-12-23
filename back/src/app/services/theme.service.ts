import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'portfolio-theme';
  private readonly darkWallpaper = 'assets/img/Wallparpers/wallpaper-dark.jpg';
  private readonly lightWallpaper = 'assets/img/Wallparpers/wallpaper-light.jpg';

  // Signal para el tema actual
  currentTheme = signal<Theme>(this.getInitialTheme());
  
  // Signal para el wallpaper actual
  currentWallpaper = signal<string>(this.getWallpaperForTheme(this.currentTheme()));

  constructor() {
    // Aplicar tema inicial
    const initialTheme = this.currentTheme();
    this.applyTheme(initialTheme);
    
    // Efecto para actualizar el wallpaper cuando cambia el tema
    effect(() => {
      const theme = this.currentTheme();
      this.currentWallpaper.set(this.getWallpaperForTheme(theme));
      this.applyTheme(theme);
    });
  }

  private getInitialTheme(): Theme {
    const saved = localStorage.getItem(this.THEME_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    return 'dark'; // Tema por defecto
  }

  private getWallpaperForTheme(theme: Theme): string {
    return theme === 'dark' ? this.darkWallpaper : this.lightWallpaper;
  }

  toggleTheme(): void {
    const newTheme: Theme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.currentTheme.set(newTheme);
    localStorage.setItem(this.THEME_KEY, newTheme);
  }

  private applyTheme(theme: Theme): void {
    const root = document.documentElement;
    const body = document.body;
    
    if (theme === 'light') {
      root.classList.add('lightTheme');
      root.classList.remove('darkTheme');
    } else {
      root.classList.remove('lightTheme');
      root.classList.add('darkTheme');
    }

    // Aplicar wallpaper como background
    const wallpaper = this.getWallpaperForTheme(theme);
    body.style.backgroundImage = `url(${wallpaper})`;
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundAttachment = 'fixed';
  }
}

