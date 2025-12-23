import { Component, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';
import { PortfolioService } from '../../services/portfolio.service';
import { TranslationService } from '../../services/translation.service';
import { ModalComponent } from '../modal/modal.component';
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
  private portfolioService = inject(PortfolioService);
  private translationService = inject(TranslationService);
  
  ngOnInit(): void {
    this.themeService.currentTheme();
  }
  
  // Datos desde Firebase (solo lectura)
  projects = this.portfolioService.projects;
  skills = this.portfolioService.skills;
  allContents = this.portfolioService.contents;
  cvUrl = this.portfolioService.cvUrl;
  isLoading = this.portfolioService.isLoading;
  
  // Traducciones
  t = computed(() => this.languageService.getTranslations());
  
  // Habilidades traducidas
  translatedSkills = computed(() => {
    const currentSkills = this.skills();
    return currentSkills.map(skillGroup => ({
      ...skillGroup,
      h2: this.getSkillGroupTitle(skillGroup.h2),
      items: skillGroup.items?.map(item => this.translationService.translate(item)),
      itemsObject: skillGroup.itemsObject?.map(item => ({
        ...item,
        name: this.translationService.translate(item.name)
      }))
    }));
  });
  
  // Contenidos traducidos
  translatedContents = computed(() => {
    const currentContents = this.allContents();
    return currentContents.map(content => ({
      ...content,
      titleButton: this.translationService.translateContentTitle(content.titleButton),
      listContent: content.listContent?.map(item => ({
        ...item,
        subTitle: this.translationService.translate(item.subTitle),
        description: this.translationService.translate(item.description),
        date: this.translationService.translateDate(item.date)
      }))
    }));
  });
  
  // Función para obtener el título traducido de habilidades
  getSkillGroupTitle(h2: string): string {
    const translations = this.t();
    // Mapear los títulos de Firebase a las traducciones
    if (h2 === 'Herramientas' || h2 === 'Tooling') {
      return translations.tooling;
    }
    if (h2 === 'Habilidades blandas' || h2 === 'Soft Skills') {
      return translations.softSkills;
    }
    // Si no coincide, devolver el original
    return h2;
  }
  
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

