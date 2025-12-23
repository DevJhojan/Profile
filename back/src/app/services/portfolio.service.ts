import { Injectable, signal } from '@angular/core';
import { 
  ref, 
  get, 
  set, 
  push, 
  remove, 
  onValue,
  off,
  DatabaseReference 
} from 'firebase/database';
import { database } from './firebase.config';
import type { ICardProjects, ICardNormal, IContent } from '@models';

interface PortfolioData {
  projects: ICardProjects[];
  skills: ICardNormal[];
  contents: IContent[];
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  // Signals para los datos
  projects = signal<ICardProjects[]>([]);
  skills = signal<ICardNormal[]>([]);
  contents = signal<IContent[]>([]);
  cvUrl = signal<string>('');
  isLoading = signal<boolean>(false);

  private projectsRef: DatabaseReference;
  private skillsRef: DatabaseReference;
  private contentsRef: DatabaseReference;
  private cvUrlRef: DatabaseReference;

  constructor() {
    this.projectsRef = ref(database, 'portfolio/projects');
    this.skillsRef = ref(database, 'portfolio/skills');
    this.contentsRef = ref(database, 'portfolio/contents');
    this.cvUrlRef = ref(database, 'portfolio/cvUrl');

    // Suscribirse a cambios en tiempo real
    this.subscribeToChanges();
  }

  private subscribeToChanges(): void {
    onValue(this.projectsRef, (snapshot) => {
      const data = snapshot.val();
      this.projects.set(data || []);
    });

    onValue(this.skillsRef, (snapshot) => {
      const data = snapshot.val();
      this.skills.set(data || []);
    });

    onValue(this.contentsRef, (snapshot) => {
      const data = snapshot.val();
      this.contents.set(data || []);
    });

    onValue(this.cvUrlRef, (snapshot) => {
      const data = snapshot.val();
      this.cvUrl.set(data || '');
    });
  }

  // ===== CV URL =====
  async loadCvUrl(): Promise<void> {
    try {
      const snapshot = await get(this.cvUrlRef);
      const data = snapshot.val();
      this.cvUrl.set(data || '');
    } catch (error) {
      console.error('Error al cargar URL del CV:', error);
    }
  }

  async updateCvUrl(url: string): Promise<void> {
    try {
      await set(this.cvUrlRef, url);
    } catch (error) {
      console.error('Error al actualizar URL del CV:', error);
      throw error;
    }
  }

  async deleteCvUrl(): Promise<void> {
    try {
      await remove(this.cvUrlRef);
    } catch (error) {
      console.error('Error al eliminar URL del CV:', error);
      throw error;
    }
  }

  // ===== PROYECTOS =====
  async loadProjects(): Promise<void> {
    try {
      this.isLoading.set(true);
      const snapshot = await get(this.projectsRef);
      const data = snapshot.val();
      this.projects.set(data || []);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async addProject(project: ICardProjects): Promise<void> {
    try {
      const currentProjects = this.projects();
      const newProjects = [...currentProjects, project];
      await set(this.projectsRef, newProjects);
    } catch (error) {
      console.error('Error al agregar proyecto:', error);
      throw error;
    }
  }

  async updateProject(index: number, project: ICardProjects): Promise<void> {
    try {
      const currentProjects = this.projects();
      currentProjects[index] = project;
      await set(this.projectsRef, currentProjects);
    } catch (error) {
      console.error('Error al actualizar proyecto:', error);
      throw error;
    }
  }

  async deleteProject(index: number): Promise<void> {
    try {
      const currentProjects = this.projects();
      currentProjects.splice(index, 1);
      await set(this.projectsRef, currentProjects);
    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
      throw error;
    }
  }

  // ===== HABILIDADES =====
  async loadSkills(): Promise<void> {
    try {
      this.isLoading.set(true);
      const snapshot = await get(this.skillsRef);
      const data = snapshot.val();
      this.skills.set(data || []);
    } catch (error) {
      console.error('Error al cargar habilidades:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async updateSkills(skills: ICardNormal[]): Promise<void> {
    try {
      await set(this.skillsRef, skills);
    } catch (error) {
      console.error('Error al actualizar habilidades:', error);
      throw error;
    }
  }

  async addSkillItem(skillGroupIndex: number, skillItem: string): Promise<void> {
    try {
      const currentSkills = this.skills();
      if (currentSkills[skillGroupIndex]?.items) {
        currentSkills[skillGroupIndex].items = [
          ...(currentSkills[skillGroupIndex].items || []),
          skillItem
        ];
        await set(this.skillsRef, currentSkills);
      }
    } catch (error) {
      console.error('Error al agregar habilidad:', error);
      throw error;
    }
  }

  async updateSkillItem(skillGroupIndex: number, itemIndex: number, skillItem: string): Promise<void> {
    try {
      const currentSkills = this.skills();
      if (currentSkills[skillGroupIndex]?.items && currentSkills[skillGroupIndex].items) {
        currentSkills[skillGroupIndex].items[itemIndex] = skillItem;
        await set(this.skillsRef, currentSkills);
      }
    } catch (error) {
      console.error('Error al actualizar habilidad:', error);
      throw error;
    }
  }

  async deleteSkillItem(skillGroupIndex: number, itemIndex: number): Promise<void> {
    try {
      const currentSkills = this.skills();
      if (currentSkills[skillGroupIndex]?.items) {
        currentSkills[skillGroupIndex].items?.splice(itemIndex, 1);
        await set(this.skillsRef, currentSkills);
      }
    } catch (error) {
      console.error('Error al eliminar habilidad:', error);
      throw error;
    }
  }

  // ===== HABILIDADES DURAS (itemsObject) =====
  async addSkillObject(skillGroupIndex: number, skillObject: { name: string; img: string; url?: string }): Promise<void> {
    try {
      const currentSkills = this.skills();
      if (currentSkills[skillGroupIndex]?.itemsObject) {
        currentSkills[skillGroupIndex].itemsObject = [
          ...(currentSkills[skillGroupIndex].itemsObject || []),
          skillObject
        ];
        await set(this.skillsRef, currentSkills);
      }
    } catch (error) {
      console.error('Error al agregar habilidad dura:', error);
      throw error;
    }
  }

  async updateSkillObject(skillGroupIndex: number, itemIndex: number, skillObject: { name: string; img: string; url?: string }): Promise<void> {
    try {
      const currentSkills = this.skills();
      if (currentSkills[skillGroupIndex]?.itemsObject && currentSkills[skillGroupIndex].itemsObject) {
        currentSkills[skillGroupIndex].itemsObject[itemIndex] = skillObject;
        await set(this.skillsRef, currentSkills);
      }
    } catch (error) {
      console.error('Error al actualizar habilidad dura:', error);
      throw error;
    }
  }

  async deleteSkillObject(skillGroupIndex: number, itemIndex: number): Promise<void> {
    try {
      const currentSkills = this.skills();
      if (currentSkills[skillGroupIndex]?.itemsObject) {
        currentSkills[skillGroupIndex].itemsObject?.splice(itemIndex, 1);
        await set(this.skillsRef, currentSkills);
      }
    } catch (error) {
      console.error('Error al eliminar habilidad dura:', error);
      throw error;
    }
  }

  // ===== CONTENIDO (Formación, Experiencia, Referencias) =====
  async loadContents(): Promise<void> {
    try {
      this.isLoading.set(true);
      const snapshot = await get(this.contentsRef);
      const data = snapshot.val();
      this.contents.set(data || []);
    } catch (error) {
      console.error('Error al cargar contenidos:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async updateContents(contents: IContent[]): Promise<void> {
    try {
      await set(this.contentsRef, contents);
    } catch (error) {
      console.error('Error al actualizar contenidos:', error);
      throw error;
    }
  }

  async addContentItem(contentIndex: number, item: any): Promise<void> {
    try {
      const currentContents = this.contents();
      if (currentContents[contentIndex]?.listContent) {
        currentContents[contentIndex].listContent = [
          ...(currentContents[contentIndex].listContent || []),
          item
        ];
        await set(this.contentsRef, currentContents);
      }
    } catch (error) {
      console.error('Error al agregar elemento:', error);
      throw error;
    }
  }

  async updateContentItem(contentIndex: number, itemIndex: number, item: any): Promise<void> {
    try {
      const currentContents = this.contents();
      if (currentContents[contentIndex]?.listContent) {
        currentContents[contentIndex].listContent![itemIndex] = item;
        await set(this.contentsRef, currentContents);
      }
    } catch (error) {
      console.error('Error al actualizar elemento:', error);
      throw error;
    }
  }

  async deleteContentItem(contentIndex: number, itemIndex: number): Promise<void> {
    try {
      const currentContents = this.contents();
      if (currentContents[contentIndex]?.listContent) {
        currentContents[contentIndex].listContent?.splice(itemIndex, 1);
        await set(this.contentsRef, currentContents);
      }
    } catch (error) {
      console.error('Error al eliminar elemento:', error);
      throw error;
    }
  }

  // Cargar todos los datos iniciales
  async initializeData(): Promise<void> {
    await Promise.all([
      this.loadProjects(),
      this.loadSkills(),
      this.loadContents(),
      this.loadCvUrl()
    ]);
  }

  // Limpiar suscripciones
  unsubscribe(): void {
    off(this.projectsRef);
    off(this.skillsRef);
    off(this.contentsRef);
    off(this.cvUrlRef);
  }
}

