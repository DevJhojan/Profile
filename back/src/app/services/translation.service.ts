import { Injectable, computed } from '@angular/core';
import { LanguageService, type Language } from './language.service';

interface TranslatableItem {
  es: string;
  en: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private languageService: LanguageService) {}

  // Mapa de traducciones para habilidades comunes
  private skillTranslations: Record<string, TranslatableItem> = {
    'Angular': { es: 'Angular', en: 'Angular' },
    'Python': { es: 'Python', en: 'Python' },
    'FastApi': { es: 'FastApi', en: 'FastApi' },
    'SQLite': { es: 'SQLite', en: 'SQLite' },
    'MySQL': { es: 'MySQL', en: 'MySQL' },
    'Mongo DB': { es: 'Mongo DB', en: 'Mongo DB' },
    'Adaptabilidad': { es: 'Adaptabilidad', en: 'Adaptability' },
    'Liderazgo': { es: 'Liderazgo', en: 'Leadership' },
    'Trabajo en equipo': { es: 'Trabajo en equipo', en: 'Teamwork' },
    'Administración': { es: 'Administración', en: 'Administration' }
  };

  // Mapa de traducciones para contenidos comunes
  private contentTranslations: Record<string, TranslatableItem> = {
    'Formación': { es: 'Formación', en: 'Training' },
    'Experiencia': { es: 'Experiencia', en: 'Experience' },
    'Referencias': { es: 'Referencias', en: 'References' },
    'Ingeniería de Sistemas': { es: 'Ingeniería de Sistemas', en: 'Systems Engineering' },
    'Inglés Intensivo': { es: 'Inglés Intensivo', en: 'Intensive English' },
    'Angular 11': { es: 'Angular 11', en: 'Angular 11' },
    'Análisis de Desarrollo de Software': { es: 'Análisis de Desarrollo de Software', en: 'Software Development Analysis' },
    'Desarrollador Frontend Freelance': { es: 'Desarrollador Frontend Freelance', en: 'Frontend Developer Freelance' },
    'Practicante de Análisis de Desarrollo de Software': { es: 'Practicante de Análisis de Desarrollo de Software', en: 'Software Development Analysis Intern' },
    'Profesor Universitario': { es: 'Profesor Universitario', en: 'University Professor' },
    'Comerciante': { es: 'Comerciante', en: 'Merchant' },
    'Supervisora de Estacionamiento': { es: 'Supervisora de Estacionamiento', en: 'Parking Supervisor' },
    'Asesora Comercial': { es: 'Asesora Comercial', en: 'Commercial Advisor' },
    'Oficinista': { es: 'Oficinista', en: 'Office Clerk' },
    'Aplazado': { es: 'Aplazado', en: 'Postponed' },
    'Finalizado': { es: 'Finalizado', en: 'Completed' }
  };

  /**
   * Traduce un texto según el idioma actual
   */
  translate(text: string): string {
    const lang = this.languageService.currentLanguage();
    const lowerText = text.trim();
    
    // Buscar en traducciones de habilidades
    if (this.skillTranslations[lowerText]) {
      return this.skillTranslations[lowerText][lang];
    }
    
    // Buscar en traducciones de contenidos
    if (this.contentTranslations[lowerText]) {
      return this.contentTranslations[lowerText][lang];
    }
    
    // Si no hay traducción, devolver el texto original
    return text;
  }

  /**
   * Traduce una fecha que contiene palabras en español
   */
  translateDate(date: string): string {
    const lang = this.languageService.currentLanguage();
    if (lang === 'en') {
      return date
        .replace(/Aplazado/g, 'Postponed')
        .replace(/Finalizado/g, 'Completed')
        .replace(/->/g, '->');
    }
    return date;
  }

  /**
   * Traduce el título de un contenido
   */
  translateContentTitle(title: string): string {
    const lang = this.languageService.currentLanguage();
    const translations: Record<string, { es: string; en: string }> = {
      'Formación': { es: 'Formación', en: 'Training' },
      'Experiencia': { es: 'Experiencia', en: 'Experience' },
      'Referencias': { es: 'Referencias', en: 'References' }
    };
    
    return translations[title]?.[lang] || title;
  }
}

