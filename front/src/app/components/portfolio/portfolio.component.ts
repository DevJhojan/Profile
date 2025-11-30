import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { ModalComponent } from '../modal/modal.component';
import { projectsData } from '../../data/Projects.data';
import { skillsData } from '../../data/skills.data';
import { contentsData } from '../../data/contents.data';
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
  
  ngOnInit(): void {
    this.themeService.currentTheme();
  }
  
  // Datos
  projects: ICardProjects[] = projectsData;
  skills: ICardNormal[] = skillsData;
  allContents: IContent[] = contentsData;
  
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
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
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

