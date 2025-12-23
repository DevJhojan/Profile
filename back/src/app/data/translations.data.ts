import type { ICardProjects, ICardNormal, IContent } from '@models';
import { TypeApp, Subcontent } from '@models';

export interface TranslatedProjects {
  es: ICardProjects[];
  en: ICardProjects[];
}

export interface TranslatedSkills {
  es: ICardNormal[];
  en: ICardNormal[];
}

export interface TranslatedContents {
  es: IContent[];
  en: IContent[];
}

export const projectsData: TranslatedProjects = {
  es: [
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
  ],
  en: [
    {
      img: 'assets/img/Pokedesk/pokedesk2.png',
      name: 'Pokedesk',
      tool: 'Angular',
      state: 'Active',
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
      state: 'Active',
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
      state: 'Active',
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
  ],
};

export const skillsData: TranslatedSkills = {
  es: [
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
  ],
  en: [
    {
      h2: 'Tooling',
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
      h2: 'Soft Skills',
      items: ['Adaptability', 'Leadership', 'Teamwork', 'Administration']
    }
  ],
};

export const contentsData: TranslatedContents = {
  es: [
    {
      titleButton: 'Formación',
      listContent: [
        new Subcontent('Ingeniería de Sistemas', 'Corporación Universitaria Americana', 'Aplazado 2024'),
        new Subcontent('Inglés Intensivo', 'Centro de Idiomas Americano', 'Aplazado 2024'),
        new Subcontent('Angular 11', 'Udemy', 'Finalizado 2023'),
        new Subcontent('Análisis de Desarrollo de Software', 'Censa', 'Finalizado 2022'),
        new Subcontent('Desarrollo Gráfico de Proyectos de Arquitectura e Ingeniería', 'Sena', 'Finalizado 2019'),
        new Subcontent('Técnica en Dibujo Arquitectónico', 'Sena', 'Finalizado 2017'),
        new Subcontent('Bachillerato', 'IE. Luis Carlos Galán Sarmiento', 'Finalizado 2017')
      ],
      count: 0
    },
    {
      titleButton: 'Experiencia',
      listContent: [
        new Subcontent('Desarrollador Frontend Freelance', 'Its Colombia', 'Septiembre 2023 -> Noviembre 2023'),
        new Subcontent('Practicante de Análisis de Desarrollo de Software', 'Acrecer', 'Octubre 2022 -> Abril 2023')
      ],
      count: 1
    },
    {
      titleButton: 'Referencias',
      listContent: [
        new Subcontent('Frey Castro R', 'Profesor Universitario', 'freycastro@yahoo.com'),
        new Subcontent('Elkin Villa', 'Profesor Universitario', '300 6395761'),
        new Subcontent('Yenni Andrea Izasa', 'Comerciante', '3007143189'),
        new Subcontent('Marta Álvarez', 'Supervisora de Estacionamiento', '3004530399'),
        new Subcontent('Alison Isaza', 'Asesora Comercial', '301 2512116'),
        new Subcontent('Leedy Albeni Toro', 'Oficinista', '316 3557847')
      ],
      count: 2
    },
  ],
  en: [
    {
      titleButton: 'Training',
      listContent: [
        new Subcontent('Systems Engineering', 'Corporación Universitaria Americana', 'Postponed 2024'),
        new Subcontent('Intensive English', 'Centro de Idiomas Americano', 'Postponed 2024'),
        new Subcontent('Angular 11', 'Udemy', 'Completed 2023'),
        new Subcontent('Software Development Analysis', 'Censa', 'Completed 2022'),
        new Subcontent('Graphic Development of Architecture and Engineering Projects', 'Sena', 'Completed 2019'),
        new Subcontent('Technical in Architectural Drawing', 'Sena', 'Completed 2017'),
        new Subcontent('High School', 'IE. Luis Carlos Galán Sarmiento', 'Completed 2017')
      ],
      count: 0
    },
    {
      titleButton: 'Experience',
      listContent: [
        new Subcontent('Freelance Frontend Developer', 'Its Colombia', 'September 2023 -> November 2023'),
        new Subcontent('Software Development Analysis Intern', 'Acrecer', 'October 2022 -> April 2023')
      ],
      count: 1
    },
    {
      titleButton: 'Referred',
      listContent: [
        new Subcontent('Frey Castro R', 'University Professor', 'freycastro@yahoo.com'),
        new Subcontent('Elkin Villa', 'University Professor', '300 6395761'),
        new Subcontent('Yenni Andrea Izasa', 'Merchant', '3007143189'),
        new Subcontent('Marta Álvarez', 'Parking Supervisor', '3004530399'),
        new Subcontent('Alison Isaza', 'Commercial Advisor', '301 2512116'),
        new Subcontent('Leedy Albeni Toro', 'Office Clerk', '316 3557847')
      ],
      count: 2
    },
  ],
};

