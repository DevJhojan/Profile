import { IContent, Subcontent } from "@models";

export const contentsData : IContent[] = [
    {
      titleButton: 'Training',
      listContent: [
        new Subcontent('Systems engineering', 'Corporación Universitaria Americana', 'Aplazado 2024'),
        new Subcontent('Intensive English', 'Centro de Idiomas Americano', 'Aplazado 2024'),
        new Subcontent('Angular 11', 'Udemy', 'Finalizado 2023'),
        new Subcontent('Analisis De desarrollo de Software', 'Censa', 'Finalizado 2022'),
        new Subcontent('Desarrollo Gráfico de Proyectos de Arquitectura e Ingenieria', 'Sena', 'Finalizado 2019'),
        new Subcontent('Tecnica en Dibujo Arquitectonico', 'Sena', 'Finalizado 2017'),
        new Subcontent('Bachillerato', 'IE. Luis Carlos Galan Sarmiento', 'Finalizado 2017')
      ],
      count: 0
    },
    {
      titleButton: 'Experience',
      listContent: [
        new Subcontent('Freelance Desarrollador FronEnd', 'Its Colombia', 'Septiembre 2023 -> Noviembre 2023'),
        new Subcontent('Practicante de Analisis de desarrollo de Software', 'Acrecer', 'Octubre 2022 -> Abril 2023')
      ],
      count: 1
    },
    {
      titleButton: 'Referred',
      listContent: [
        new Subcontent('Frey Castro R', 'Profesor Universitario', 'freycastro@yahoo.com'),
        new Subcontent('Elkin Villa', 'Profesor Universitario', '300 6395761'),
        new Subcontent('Yenni Andrea Izasa', 'Comerciante ', '3007143189' ),
        new Subcontent('Marta Alvares', 'Supervisora de Esacionamiento', '3004530399'),
        new Subcontent('Alison Isaza', 'Asesora Comercial', '301 2512116'),
        new Subcontent('Leedy Albeni Toro ', 'Oficinista', '316 3557847')
      ],
      count: 2
    },
]
