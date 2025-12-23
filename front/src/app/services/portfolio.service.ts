import { Injectable, signal } from '@angular/core';
import { 
  ref, 
  onValue,
  DatabaseReference 
} from 'firebase/database';
import { database } from './firebase.config';
import type { ICardProjects, ICardNormal, IContent } from '@models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  // Signals para los datos (solo lectura)
  projects = signal<ICardProjects[]>([]);
  skills = signal<ICardNormal[]>([]);
  contents = signal<IContent[]>([]);
  cvUrl = signal<string>('');
  isLoading = signal<boolean>(true);

  private projectsRef: DatabaseReference;
  private skillsRef: DatabaseReference;
  private contentsRef: DatabaseReference;
  private cvUrlRef: DatabaseReference;

  constructor() {
    this.projectsRef = ref(database, 'portfolio/projects');
    this.skillsRef = ref(database, 'portfolio/skills');
    this.contentsRef = ref(database, 'portfolio/contents');
    this.cvUrlRef = ref(database, 'portfolio/cvUrl');

    // Suscribirse a cambios en tiempo real (solo lectura)
    this.subscribeToChanges();
  }

  private subscribeToChanges(): void {
    // Escuchar cambios en proyectos
    onValue(this.projectsRef, (snapshot) => {
      const data = snapshot.val();
      this.projects.set(data || []);
      this.isLoading.set(false);
    }, (error) => {
      console.error('Error al cargar proyectos:', error);
      this.isLoading.set(false);
    });

    // Escuchar cambios en habilidades
    onValue(this.skillsRef, (snapshot) => {
      const data = snapshot.val();
      this.skills.set(data || []);
    }, (error) => {
      console.error('Error al cargar habilidades:', error);
    });

    // Escuchar cambios en contenidos
    onValue(this.contentsRef, (snapshot) => {
      const data = snapshot.val();
      this.contents.set(data || []);
    }, (error) => {
      console.error('Error al cargar contenidos:', error);
    });

    // Escuchar cambios en URL del CV
    onValue(this.cvUrlRef, (snapshot) => {
      const data = snapshot.val();
      this.cvUrl.set(data || '');
    }, (error) => {
      console.error('Error al cargar URL del CV:', error);
    });
  }
}

