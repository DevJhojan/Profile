import { Injectable } from '@angular/core';
import { ref, set, get } from 'firebase/database';
import { database } from './firebase.config';
import type { ICardProjects, ICardNormal, IContent } from '@models';
import { TypeApp } from '@models';

// Datos por defecto para migración (extraídos de translations.data.ts)
const DEFAULT_PROJECTS: ICardProjects[] = [
  {
    img: 'assets/img/Pokedesk/pokedesk2.png',
    name: 'Pokedesk',
    tool: 'Angular',
    state: 'Activo',
    type: TypeApp.WEB,
    url: 'https://pokedesk-lilac.vercel.app/',
    imgs: [
      'assets/img/Pokedesk/1.png',
      'assets/img/Pokedesk/2.png',
      'assets/img/Pokedesk/3.png',
      'assets/img/Pokedesk/4.png',
      'assets/img/Pokedesk/5.png',
      'assets/img/Pokedesk/6.png',
    ],
  },
  {
    img: 'assets/img/RickAndMorty/RickAndMorty.png',
    name: 'Rick & Morty',
    tool: 'Angular',
    state: 'Activo',
    type: TypeApp.WEB,
    url: 'https://rick-and-morty-three-omega.vercel.app',
    imgs: [
      'assets/img/RickAndMorty/1.png',
      'assets/img/RickAndMorty/2.png',
      'assets/img/RickAndMorty/3.png',
      'assets/img/RickAndMorty/4.png',
      'assets/img/RickAndMorty/6.png',
      'assets/img/RickAndMorty/5.png',
    ],
  },
  {
    img: 'assets/img/FinanceManager/icons.ico',
    name: 'Finance Manager',
    tool: 'C# .Net',
    state: 'Activo',
    type: TypeApp.APPLICATION,
    url: 'https://github.com/DevJhojanXX/FinanceInstall/raw/main/Finance.zip',
    imgs: [
      'assets/img/FinanceManager/1.png',
      'assets/img/FinanceManager/2.png',
      'assets/img/FinanceManager/3.png',
      'assets/img/FinanceManager/4.png',
      'assets/img/FinanceManager/5.png',
    ],
  },
];

const DEFAULT_SKILLS: ICardNormal[] = [
  {
    h2: 'Herramientas',
    itemsObject: [
      { name: 'Angular', img: 'assets/img/skills/Angular_logo.png' },
      { name: 'Python', img: 'assets/img/skills/python.png' },
      { name: 'FastApi', img: 'assets/img/skills/Fast_api_logo.png' },
      { name: 'SQLite', img: 'assets/img/skills/SQLServer_logo.png' },
      { name: 'MySQL', img: 'assets/img/skills/SQLServer_logo.png' },
      { name: 'Mongo DB', img: 'assets/img/skills/MongoDB_logo.png' }
    ]
  },
  {
    h2: 'Habilidades blandas',
    items: ['Adaptabilidad', 'Liderazgo', 'Trabajo en equipo', 'Administración']
  }
];

const DEFAULT_CONTENTS: IContent[] = [
  {
    titleButton: 'Formación',
    listContent: [
      { subTitle: 'Ingeniería de Sistemas', description: 'Corporación Universitaria Americana', date: 'Aplazado 2024' },
      { subTitle: 'Inglés Intensivo', description: 'Centro de Idiomas Americano', date: 'Aplazado 2024' },
      { subTitle: 'Angular 11', description: 'Udemy', date: 'Finalizado 2023' },
      { subTitle: 'Análisis de Desarrollo de Software', description: 'Censa', date: 'Finalizado 2022' },
      { subTitle: 'Desarrollo Gráfico de Proyectos de Arquitectura e Ingeniería', description: 'Sena', date: 'Finalizado 2019' },
      { subTitle: 'Técnica en Dibujo Arquitectónico', description: 'Sena', date: 'Finalizado 2017' },
      { subTitle: 'Bachillerato', description: 'IE. Luis Carlos Galán Sarmiento', date: 'Finalizado 2017' }
    ],
    count: 0
  },
  {
    titleButton: 'Experiencia',
    listContent: [
      { subTitle: 'Desarrollador Frontend Freelance', description: 'Its Colombia', date: 'Septiembre 2023 -> Noviembre 2023' },
      { subTitle: 'Practicante de Análisis de Desarrollo de Software', description: 'Acrecer', date: 'Octubre 2022 -> Abril 2023' }
    ],
    count: 1
  },
  {
    titleButton: 'Referencias',
    listContent: [
      { subTitle: 'Frey Castro R', description: 'Profesor Universitario', date: 'freycastro@yahoo.com' },
      { subTitle: 'Elkin Villa', description: 'Profesor Universitario', date: '300 6395761' },
      { subTitle: 'Yenni Andrea Izasa', description: 'Comerciante', date: '3007143189' },
      { subTitle: 'Marta Álvarez', description: 'Supervisora de Estacionamiento', date: '3004530399' },
      { subTitle: 'Alison Isaza', description: 'Asesora Comercial', date: '301 2512116' },
      { subTitle: 'Leedy Albeni Toro', description: 'Oficinista', date: '316 3557847' }
    ],
    count: 2
  },
];

@Injectable({
  providedIn: 'root'
})
export class DataMigrationService {
  private portfolioRef = ref(database, 'portfolio');

  /**
   * Migra todos los datos de la carpeta data a Firebase
   * Solo migra si Firebase está vacío
   */
  async migrateDataIfEmpty(): Promise<{ success: boolean; message: string }> {
    try {
      console.log('🔄 Verificando si hay datos en Firebase...');
      
      // Verificar si ya hay datos
      const snapshot = await get(this.portfolioRef);
      if (snapshot.exists()) {
        console.log('✅ Ya existen datos en Firebase, omitiendo migración');
        return { 
          success: true, 
          message: 'Los datos ya están en Firebase' 
        };
      }

      console.log('📦 Iniciando migración de datos a Firebase...');

      // Convertir datos a formato JSON plano
      // Usar datos por defecto
      const projects = this.convertProjectsToPlain(DEFAULT_PROJECTS);
      const skills = this.convertSkillsToPlain(DEFAULT_SKILLS);
      const contents = this.convertContentsToPlain(DEFAULT_CONTENTS);

      // Guardar en Firebase
      await set(ref(database, 'portfolio/projects'), projects);
      console.log('✅ Proyectos migrados:', projects.length);

      await set(ref(database, 'portfolio/skills'), skills);
      console.log('✅ Habilidades migradas:', skills.length);

      await set(ref(database, 'portfolio/contents'), contents);
      console.log('✅ Contenidos migrados:', contents.length);

      console.log('✅ Migración completada exitosamente');
      return { 
        success: true, 
        message: 'Datos migrados exitosamente a Firebase' 
      };

    } catch (error: any) {
      console.error('❌ Error durante la migración:', error);
      return { 
        success: false, 
        message: `Error al migrar datos: ${error.message}` 
      };
    }
  }

  /**
   * Convierte proyectos a formato JSON plano
   */
  private convertProjectsToPlain(projects: ICardProjects[]): any[] {
    return projects.map(project => ({
      img: project.img,
      name: project.name,
      tool: project.tool,
      state: project.state,
      type: project.type, // TypeApp enum se guarda como número
      url: project.url,
      imgs: project.imgs || []
    }));
  }

  /**
   * Convierte habilidades a formato JSON plano
   */
  private convertSkillsToPlain(skills: ICardNormal[]): any[] {
    return skills.map(skill => ({
      h2: skill.h2,
      items: skill.items || [],
      itemsObject: skill.itemsObject ? skill.itemsObject.map(item => ({
        name: item.name,
        img: item.img,
        url: item.url || ''
      })) : []
    }));
  }

  /**
   * Convierte contenidos a formato JSON plano
   */
  private convertContentsToPlain(contents: IContent[]): any[] {
    return contents.map(content => ({
      titleButton: content.titleButton,
      count: content.count,
      listContent: content.listContent ? content.listContent.map(item => ({
        subTitle: item.subTitle,
        description: item.description,
        date: item.date
      })) : []
    }));
  }
}

