import { Component, inject, OnInit, OnDestroy, computed, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';
import { AuthService } from '../../services/auth.service';
import { PortfolioService } from '../../services/portfolio.service';
import { DataMigrationService } from '../../services/data-migration.service';
import { TranslationService } from '../../services/translation.service';
import { ModalComponent } from '../modal/modal.component';
import type { ICardProjects, ICardNormal, IContent } from '@models';
import { TypeApp, Subcontent } from '@models';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit, OnDestroy {
  private themeService = inject(ThemeService);
  private languageService = inject(LanguageService);
  private authService = inject(AuthService);
  private portfolioService = inject(PortfolioService);
  private dataMigrationService = inject(DataMigrationService);
  private translationService = inject(TranslationService);
  
  async ngOnInit(): Promise<void> {
    this.themeService.currentTheme();
    
    // Migrar datos de la carpeta data a Firebase si está vacío
    await this.dataMigrationService.migrateDataIfEmpty();
    
    // Cargar datos desde Firebase
    await this.portfolioService.initializeData();
  }
  
  // Datos desde Firebase
  projects = computed(() => this.portfolioService.projects());
  skills = computed(() => this.portfolioService.skills());
  allContents = computed(() => this.portfolioService.contents());
  cvUrl = this.portfolioService.cvUrl;
  
  // Ordenamiento de proyectos
  projectSortOrder = signal<'default' | 'name-asc' | 'name-desc' | 'state-asc' | 'state-desc' | 'recent-first' | 'oldest-first'>('default');
  sortedProjects = computed(() => {
    const projectsList = this.projects();
    const order = this.projectSortOrder();
    
    if (order === 'default') {
      return projectsList;
    }
    
    // Crear una copia con el índice original para ordenamiento por fecha
    const projectsWithIndex = projectsList.map((project, index) => ({ project, originalIndex: index }));
    
    switch (order) {
      case 'name-asc':
        return projectsList.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return projectsList.sort((a, b) => b.name.localeCompare(a.name));
      case 'state-asc':
        return projectsList.sort((a, b) => a.state.localeCompare(b.state));
      case 'state-desc':
        return projectsList.sort((a, b) => b.state.localeCompare(a.state));
      case 'recent-first':
        // Los más recientes primero (últimos en el array original = índice más alto)
        return [...projectsList].reverse();
      case 'oldest-first':
        // Los más antiguos primero (primeros en el array original = índice más bajo)
        return [...projectsList];
      default:
        return projectsList;
    }
  });
  
  // Traducciones
  t = computed(() => this.languageService.getTranslations());
  
  // Habilidades traducidas
  translatedSkills = computed(() => {
    const currentSkills = this.skills();
    const lang = this.languageService.currentLanguage();
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
    const lang = this.languageService.currentLanguage();
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
    if (h2 === 'Herramientas' || h2 === 'Tooling') {
      return translations.tooling;
    }
    if (h2 === 'Habilidades blandas' || h2 === 'Soft Skills') {
      return translations.softSkills;
    }
    return h2;
  }
  
  // Estado del modal
  isModalOpen = false;
  
  // Estados de edición
  isEditMode = computed(() => this.authService.isAuthenticated());
  editingProjectIndex = signal<number | null>(null);
  editingSkillGroupIndex = signal<number | null>(null);
  editingSkillItemIndex = signal<number | null>(null);
  editingSkillObjectIndex = signal<number | null>(null);
  editingContentIndex = signal<number | null>(null);
  editingContentItemIndex = signal<number | null>(null);
  editingCvUrl = signal<boolean>(false);
  
  // Formularios temporales
  editProjectForm = signal<Partial<ICardProjects>>({});
  editSkillForm = signal<string>('');
  editSkillObjectForm = signal<{ name: string; img: string; url?: string }>({ name: '', img: '', url: '' });
  editContentForm = signal<Partial<any>>({});
  editCvUrlForm = signal<string>('');
  
  // Estados para agregar nuevas habilidades
  addingSkillItem = signal<number | null>(null);
  addingSkillObject = signal<number | null>(null);
  isAddingSkill = signal<boolean>(false);
  newSkillType = signal<'blanda' | 'dura'>('blanda');
  newSkillForm = signal<{ name: string; img: string; url: string }>({ name: '', img: '', url: '' });
  
  // Menú de ordenamiento
  showSortMenu = signal<boolean>(false);
  
  // Control de visibilidad en móvil
  showProjects = signal<boolean>(false);
  showSkills = signal<boolean>(false);
  
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
  startEditProject(projectName: string): void {
    const projects = this.projects();
    const index = projects.findIndex(p => p.name === projectName);
    if (index !== -1) {
      const project = projects[index];
      this.editProjectForm.set({ ...project });
      this.editingProjectIndex.set(index);
    }
  }

  cancelEditProject(): void {
    this.editingProjectIndex.set(null);
    this.editProjectForm.set({});
  }

  async saveProject(projectName: string): Promise<void> {
    const projects = this.projects();
    const index = projects.findIndex(p => p.name === projectName);
    if (index !== -1) {
      const form = this.editProjectForm();
      if (form.name && form.tool && form.url) {
        await this.portfolioService.updateProject(index, form as ICardProjects);
        this.cancelEditProject();
      }
    }
  }

  async deleteProject(projectName: string): Promise<void> {
    const projects = this.projects();
    const index = projects.findIndex(p => p.name === projectName);
    if (index !== -1 && confirm('¿Estás seguro de eliminar este proyecto?')) {
      await this.portfolioService.deleteProject(index);
    }
  }
  
  getEditingProjectName(): string | null {
    const index = this.editingProjectIndex();
    if (index === null || index === -1) return null;
    const projects = this.projects();
    return projects[index]?.name || null;
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

  // ===== EDICIÓN DE HABILIDADES BLANDAS =====
  startAddSkill(): void {
    this.isAddingSkill.set(true);
    this.newSkillType.set('blanda');
    this.newSkillForm.set({ name: '', img: '', url: '' });
  }

  cancelAddSkill(): void {
    this.isAddingSkill.set(false);
    this.newSkillType.set('blanda');
    this.newSkillForm.set({ name: '', img: '', url: '' });
  }

  async saveNewSkill(): Promise<void> {
    const skills = this.skills();
    const type = this.newSkillType();
    const form = this.newSkillForm();
    
    if (type === 'blanda') {
      // Buscar el grupo de habilidades blandas
      const softSkillsIndex = skills.findIndex(s => s.items !== undefined);
      if (softSkillsIndex !== -1 && form.name.trim()) {
        await this.portfolioService.addSkillItem(softSkillsIndex, form.name.trim());
        this.cancelAddSkill();
      }
    } else {
      // Buscar el grupo de habilidades duras
      const hardSkillsIndex = skills.findIndex(s => s.itemsObject !== undefined);
      if (hardSkillsIndex !== -1 && form.name.trim() && form.img.trim()) {
        await this.portfolioService.addSkillObject(hardSkillsIndex, {
          name: form.name.trim(),
          img: form.img.trim(),
          url: form.url.trim() || undefined
        });
        this.cancelAddSkill();
      }
    }
  }

  startAddSkillItem(groupIndex: number): void {
    this.addingSkillItem.set(groupIndex);
    this.editSkillForm.set('');
  }

  cancelAddSkillItem(): void {
    this.addingSkillItem.set(null);
    this.editSkillForm.set('');
  }

  async addSkillItem(groupIndex: number): Promise<void> {
    const skill = this.editSkillForm().trim();
    if (skill) {
      await this.portfolioService.addSkillItem(groupIndex, skill);
      this.cancelAddSkillItem();
    }
  }

  startEditSkillItem(groupIndex: number, itemIndex: number): void {
    const skillGroup = this.skills()[groupIndex];
    if (skillGroup?.items) {
      this.editSkillForm.set(skillGroup.items[itemIndex]);
      this.editingSkillGroupIndex.set(groupIndex);
      this.editingSkillItemIndex.set(itemIndex);
    }
  }

  cancelEditSkillItem(): void {
    this.editingSkillGroupIndex.set(null);
    this.editingSkillItemIndex.set(null);
    this.editSkillForm.set('');
  }

  async saveSkillItem(): Promise<void> {
    const groupIndex = this.editingSkillGroupIndex();
    const itemIndex = this.editingSkillItemIndex();
    if (groupIndex !== null && itemIndex !== null) {
      const skill = this.editSkillForm().trim();
      if (skill) {
        await this.portfolioService.updateSkillItem(groupIndex, itemIndex, skill);
        this.cancelEditSkillItem();
      }
    }
  }

  async deleteSkillItem(groupIndex: number, itemIndex: number): Promise<void> {
    if (confirm('¿Estás seguro de eliminar esta habilidad?')) {
      await this.portfolioService.deleteSkillItem(groupIndex, itemIndex);
    }
  }

  // ===== EDICIÓN DE HABILIDADES DURAS =====
  startAddSkillObject(groupIndex: number): void {
    this.addingSkillObject.set(groupIndex);
    this.editSkillObjectForm.set({ name: '', img: '', url: '' });
  }

  cancelAddSkillObject(): void {
    this.addingSkillObject.set(null);
    this.editSkillObjectForm.set({ name: '', img: '', url: '' });
  }

  async addSkillObject(groupIndex: number): Promise<void> {
    const form = this.editSkillObjectForm();
    if (form.name && form.img) {
      await this.portfolioService.addSkillObject(groupIndex, form);
      this.cancelAddSkillObject();
    }
  }

  startEditSkillObject(groupIndex: number, itemIndex: number): void {
    const skillGroup = this.skills()[groupIndex];
    if (skillGroup?.itemsObject) {
      const skillObj = skillGroup.itemsObject[itemIndex];
      this.editSkillObjectForm.set({ 
        name: skillObj.name, 
        img: skillObj.img || '', 
        url: skillObj.url || '' 
      });
      this.editingSkillGroupIndex.set(groupIndex);
      this.editingSkillObjectIndex.set(itemIndex);
    }
  }

  cancelEditSkillObject(): void {
    this.editingSkillGroupIndex.set(null);
    this.editingSkillObjectIndex.set(null);
    this.editSkillObjectForm.set({ name: '', img: '', url: '' });
  }

  async saveSkillObject(): Promise<void> {
    const groupIndex = this.editingSkillGroupIndex();
    const itemIndex = this.editingSkillObjectIndex();
    if (groupIndex !== null && itemIndex !== null) {
      const form = this.editSkillObjectForm();
      if (form.name && form.img) {
        await this.portfolioService.updateSkillObject(groupIndex, itemIndex, form);
        this.cancelEditSkillObject();
      }
    }
  }

  async deleteSkillObject(groupIndex: number, itemIndex: number): Promise<void> {
    if (confirm('¿Estás seguro de eliminar esta habilidad?')) {
      await this.portfolioService.deleteSkillObject(groupIndex, itemIndex);
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

  // ===== EDICIÓN DE CV URL =====
  startEditCvUrl(): void {
    this.editCvUrlForm.set(this.cvUrl() || '');
    this.editingCvUrl.set(true);
  }

  cancelEditCvUrl(): void {
    this.editingCvUrl.set(false);
    this.editCvUrlForm.set('');
  }

  async saveCvUrl(): Promise<void> {
    const url = this.editCvUrlForm().trim();
    if (url) {
      await this.portfolioService.updateCvUrl(url);
      this.cancelEditCvUrl();
    }
  }

  async deleteCvUrl(): Promise<void> {
    if (confirm('¿Estás seguro de eliminar la URL del CV?')) {
      await this.portfolioService.deleteCvUrl();
      this.cancelEditCvUrl();
    }
  }

  downloadCv(): void {
    const url = this.cvUrl();
    if (url) {
      window.open(url, '_blank');
    }
  }

  // ===== ORDENAMIENTO DE PROYECTOS =====
  toggleSortMenu(): void {
    this.showSortMenu.update(val => !val);
  }

  setSortOrder(order: 'default' | 'name-asc' | 'name-desc' | 'state-asc' | 'state-desc' | 'recent-first' | 'oldest-first'): void {
    this.projectSortOrder.set(order);
    this.showSortMenu.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.sort-dropdown')) {
      this.showSortMenu.set(false);
    }
  }

  ngOnDestroy(): void {
    // Cerrar el menú si está abierto
    this.showSortMenu.set(false);
  }
  
  // Control de visibilidad en móvil
  toggleProjects(): void {
    this.showProjects.update(val => !val);
    if (this.showProjects()) {
      this.showSkills.set(false); // Cerrar habilidades si se abre proyectos
    }
  }
  
  toggleSkills(): void {
    this.showSkills.update(val => !val);
    if (this.showSkills()) {
      this.showProjects.set(false); // Cerrar proyectos si se abre habilidades
    }
  }
}
