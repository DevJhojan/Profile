import { Component, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';
import { ModalComponent } from '../modal/modal.component';
import { projectsData, skillsData, contentsData } from '../../data/translations.data';
import type { ICardProjects, ICardNormal, IContent } from '@models';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {
  private themeService = inject(ThemeService);
  private languageService = inject(LanguageService);
  
  ngOnInit(): void {
    this.themeService.currentTheme();
  }
  
  // Datos traducidos
  projects = computed(() => projectsData[this.languageService.currentLanguage()]);
  skills = computed(() => skillsData[this.languageService.currentLanguage()]);
  allContents = computed(() => contentsData[this.languageService.currentLanguage()]);
  
  // Traducciones
  t = computed(() => this.languageService.getTranslations());
  
  // Estado del modal
  isModalOpen = false;
  
  // Nombre completo
  fullName = 'Jhojan Danilo Toro Perez';
  
  // Imagen de perfil
  profileImage = 'assets/img/MyProfile.png';
  
  // Getters para el servicio de tema
  get currentTheme() {
    return this.themeService.currentTheme();
  }
  
  get currentWallpaper() {
    return this.themeService.currentWallpaper();
  }
  
  // Getters para el servicio de idioma
  get currentLanguage() {
    return this.languageService.currentLanguage();
  }
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  
  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }
  
  openProject(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
  
  openModal(): void {
    this.isModalOpen = true;
  }
  
  closeModal(): void {
    this.isModalOpen = false;
  }
}

