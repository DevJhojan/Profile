import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';
import { AuthService } from '../../services/auth.service';
import { PortfolioService } from '../../services/portfolio.service';
import { ModalComponent } from '../modal/modal.component';
import { projectsData, skillsData, contentsData } from '../../data/translations.data';
import type { ICardProjects, ICardNormal, IContent } from '@models';
import { TypeApp, Subcontent } from '@models';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {
  private themeService = inject(ThemeService);
  private languageService = inject(LanguageService);
  private authService = inject(AuthService);
  private portfolioService = inject(PortfolioService);
  
  ngOnInit(): void {
    this.themeService.currentTheme();
    // Cargar datos iniciales desde Firebase o usar datos por defecto
    this.portfolioService.initializeData().then(() => {
      // Si Firebase está vacío, inicializar con datos por defecto
      if (this.portfolioService.projects().length === 0) {
        const defaultProjects = projectsData[this.languageService.currentLanguage()];
        defaultProjects.forEach(project => {
          this.portfolioService.addProject(project).catch(console.error);
        });
      }
      if (this.portfolioService.skills().length === 0) {
        const defaultSkills = skillsData[this.languageService.currentLanguage()];
        this.portfolioService.updateSkills(defaultSkills).catch(console.error);
      }
      if (this.portfolioService.contents().length === 0) {
        const defaultContents = contentsData[this.languageService.currentLanguage()];
        this.portfolioService.updateContents(defaultContents).catch(console.error);
      }
    });
  }
  
  // Datos desde Firebase o traducciones
  projects = computed(() => {
    const firebaseProjects = this.portfolioService.projects();
    return firebaseProjects.length > 0 
      ? firebaseProjects 
      : projectsData[this.languageService.currentLanguage()];
  });

  skills = computed(() => {
    const firebaseSkills = this.portfolioService.skills();
    return firebaseSkills.length > 0 
      ? firebaseSkills 
      : skillsData[this.languageService.currentLanguage()];
  });

  allContents = computed(() => {
    const firebaseContents = this.portfolioService.contents();
    return firebaseContents.length > 0 
      ? firebaseContents 
      : contentsData[this.languageService.currentLanguage()];
  });
  
  // Traducciones
  t = computed(() => this.languageService.getTranslations());
  
  // Estado del modal
  isModalOpen = false;
  
  // Estados de edición
  isEditMode = computed(() => this.authService.isAuthenticated());
  editingProjectIndex = signal<number | null>(null);
  editingSkillGroupIndex = signal<number | null>(null);
  editingContentIndex = signal<number | null>(null);
  editingContentItemIndex = signal<number | null>(null);
  
  // Formularios temporales
  editProjectForm = signal<Partial<ICardProjects>>({});
  editSkillForm = signal<string>('');
  editContentForm = signal<Partial<any>>({});
  
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

  // Getters para autenticación
  get isAuthenticated() {
    return this.authService.isAuthenticated();
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

  logout(): void {
    this.authService.logout();
  }

  // ===== EDICIÓN DE PROYECTOS =====
  startEditProject(index: number): void {
    const project = this.projects()[index];
    this.editProjectForm.set({ ...project });
    this.editingProjectIndex.set(index);
  }

  cancelEditProject(): void {
    this.editingProjectIndex.set(null);
    this.editProjectForm.set({});
  }

  async saveProject(index: number | null): Promise<void> {
    if (index === null) return;
    const form = this.editProjectForm();
    if (form.name && form.tool && form.url) {
      await this.portfolioService.updateProject(index, form as ICardProjects);
      this.cancelEditProject();
    }
  }

  async deleteProject(index: number): Promise<void> {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      await this.portfolioService.deleteProject(index);
    }
  }

  startAddProject(): void {
    this.editProjectForm.set({
      img: '',
      name: '',
      tool: '',
      state: 'Activo',
      type: TypeApp.WEB,
      url: '',
      imgs: []
    });
    this.editingProjectIndex.set(-1); // -1 significa nuevo
  }

  async addProject(): Promise<void> {
    const form = this.editProjectForm();
    if (form.name && form.tool && form.url) {
      await this.portfolioService.addProject(form as ICardProjects);
      this.cancelEditProject();
    }
  }

  // ===== EDICIÓN DE HABILIDADES =====
  startEditSkillGroup(index: number): void {
    this.editingSkillGroupIndex.set(index);
  }

  cancelEditSkillGroup(): void {
    this.editingSkillGroupIndex.set(null);
    this.editSkillForm.set('');
  }

  async addSkillItem(groupIndex: number): Promise<void> {
    const skill = this.editSkillForm().trim();
    if (skill) {
      await this.portfolioService.addSkillItem(groupIndex, skill);
      this.editSkillForm.set('');
    }
  }

  async deleteSkillItem(groupIndex: number, itemIndex: number): Promise<void> {
    if (confirm('¿Estás seguro de eliminar esta habilidad?')) {
      await this.portfolioService.deleteSkillItem(groupIndex, itemIndex);
    }
  }

  // ===== EDICIÓN DE CONTENIDOS =====
  startEditContentItem(contentIndex: number, itemIndex: number): void {
    const content = this.allContents()[contentIndex];
    const item = content.listContent?.[itemIndex];
    if (item) {
      this.editContentForm.set({ ...item });
      this.editingContentIndex.set(contentIndex);
      this.editingContentItemIndex.set(itemIndex);
    }
  }

  cancelEditContentItem(): void {
    this.editingContentIndex.set(null);
    this.editingContentItemIndex.set(null);
    this.editContentForm.set({});
  }

  async saveContentItem(): Promise<void> {
    const contentIndex = this.editingContentIndex();
    const itemIndex = this.editingContentItemIndex();
    if (contentIndex !== null && itemIndex !== null) {
      const form = this.editContentForm();
      if (form['subTitle'] && form['description']) {
        await this.portfolioService.updateContentItem(contentIndex, itemIndex, form);
        this.cancelEditContentItem();
      }
    }
  }

  async deleteContentItem(contentIndex: number, itemIndex: number): Promise<void> {
    if (confirm('¿Estás seguro de eliminar este elemento?')) {
      await this.portfolioService.deleteContentItem(contentIndex, itemIndex);
    }
  }

  startAddContentItem(contentIndex: number): void {
    this.editContentForm.set({
      subTitle: '',
      description: '',
      date: ''
    });
    this.editingContentIndex.set(contentIndex);
    this.editingContentItemIndex.set(-1); // -1 significa nuevo
  }

  async addContentItem(): Promise<void> {
    const contentIndex = this.editingContentIndex();
    if (contentIndex !== null) {
      const form = this.editContentForm();
      if (form['subTitle'] && form['description']) {
        await this.portfolioService.addContentItem(contentIndex, form);
        this.cancelEditContentItem();
      }
    }
  }
}
