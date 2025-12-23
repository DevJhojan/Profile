import { Injectable, signal, effect } from '@angular/core';

export type Language = 'es' | 'en';

export interface Translations {
  // Header
  changeTheme: string;
  changeThemeToLight: string;
  changeThemeToDark: string;
  
  // Sections
  projects: string;
  aboutMe: string;
  hardAndSoftSkills: string;
  
  // Projects
  active: string;
  
  // Skills
  tooling: string;
  softSkills: string;
  
  // Modal
  modalTitle: string;
  training: string;
  experience: string;
  referred: string;
  
  // States
  activeState: string;
  pending: string;
  completed: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly LANGUAGE_KEY = 'portfolio-language';
  
  // Signal para el idioma actual
  currentLanguage = signal<Language>(this.getInitialLanguage());
  
  // Traducciones
  private translations: Record<Language, Translations> = {
    es: {
      changeTheme: 'Cambiar tema',
      changeThemeToLight: 'Cambiar a tema claro',
      changeThemeToDark: 'Cambiar a tema oscuro',
      projects: 'Proyectos',
      aboutMe: 'Más sobre mí',
      hardAndSoftSkills: 'Habilidades duras y blandas',
      active: 'Activo',
      tooling: 'Herramientas',
      softSkills: 'Habilidades blandas',
      modalTitle: 'Más sobre mí',
      training: 'Formación',
      experience: 'Experiencia',
      referred: 'Referencias',
      activeState: 'Activo',
      pending: 'Pendiente',
      completed: 'Finalizado'
    },
    en: {
      changeTheme: 'Change theme',
      changeThemeToLight: 'Change to light theme',
      changeThemeToDark: 'Change to dark theme',
      projects: 'Projects',
      aboutMe: 'More about me',
      hardAndSoftSkills: 'Hard and soft skills',
      active: 'Active',
      tooling: 'Tooling',
      softSkills: 'Soft Skills',
      modalTitle: 'More about me',
      training: 'Training',
      experience: 'Experience',
      referred: 'Referred',
      activeState: 'Active',
      pending: 'Pending',
      completed: 'Completed'
    }
  };
  
  constructor() {
    // Persistir idioma cuando cambia
    effect(() => {
      const lang = this.currentLanguage();
      localStorage.setItem(this.LANGUAGE_KEY, lang);
    });
  }
  
  private getInitialLanguage(): Language {
    const saved = localStorage.getItem(this.LANGUAGE_KEY);
    if (saved === 'es' || saved === 'en') {
      return saved;
    }
    // Detectar idioma del navegador
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'es' ? 'es' : 'en';
  }
  
  toggleLanguage(): void {
    const newLang: Language = this.currentLanguage() === 'es' ? 'en' : 'es';
    this.currentLanguage.set(newLang);
  }
  
  getTranslations(): Translations {
    return this.translations[this.currentLanguage()];
  }
  
  getTranslation(key: keyof Translations): string {
    return this.translations[this.currentLanguage()][key];
  }
}

