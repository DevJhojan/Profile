# Portfolio - Jhojan Danilo Toro Perez

Portafolio personal desarrollado con Angular 20, que muestra proyectos, habilidades y experiencia profesional de forma interactiva y responsive.

## 🚀 Características

- **Diseño Responsive**: Adaptado para móvil, tablet y escritorio
- **Tema Claro/Oscuro**: Cambio dinámico de tema con wallpapers personalizados
- **Modal Informativo**: Modal reutilizable con información detallada (Training, Experience, Referred)
- **Sección de Proyectos**: Cards interactivas con enlaces a proyectos
- **Habilidades**: Visualización de habilidades duras (con iconos) y blandas
- **Imagen de Perfil**: Visualización elegante de la imagen de perfil

## 🛠️ Tecnologías

- **Angular 20.3.4**
- **TypeScript 5.9.2**
- **CSS3** (sin dependencias de SASS)
- **RxJS 7.8.0**

## 📁 Estructura del Proyecto

```
Profile/
├── front/                    # Aplicación Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── modal/          # Componente modal reutilizable
│   │   │   │   └── portfolio/      # Componente principal del portafolio
│   │   │   ├── data/               # Datos estáticos (proyectos, habilidades, contenido)
│   │   │   ├── models/             # Modelos e interfaces TypeScript
│   │   │   └── services/
│   │   │       └── theme.service.ts # Servicio de gestión de temas
│   │   ├── assets/
│   │   │   ├── img/                # Imágenes y recursos
│   │   │   └── styles/             # Estilos globales y animaciones
│   │   └── index.html
│   └── package.json
└── back/                     # Backend (si aplica)
```

## 🚦 Instalación y Uso

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/DevJhojan/Profile.git
cd Profile
```

2. Instala las dependencias:
```bash
cd front
npm install
```

### Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm start
# o
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

### Build para Producción

```bash
# Build estándar
ng build

# Build con base-href para GitHub Pages
npm run build:ghpages
```

## 📦 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build:href` - Build con base-href relativo
- `npm run build:ghpages` - Build y despliegue a GitHub Pages
- `npm test` - Ejecuta las pruebas unitarias
- `ng build` - Compila el proyecto para producción

## 🎨 Componentes Principales

### Portfolio Component
Componente principal que muestra:
- Header con nombre y botón de cambio de tema
- 3 columnas: Proyectos, Información Personal, Habilidades
- Diseño responsive con flexbox

### Modal Component
Componente reutilizable para mostrar información detallada:
- Training (Formación académica)
- Experience (Experiencia laboral)
- Referred (Referencias)

### Theme Service
Servicio que gestiona:
- Cambio entre tema claro y oscuro
- Aplicación de wallpapers dinámicos
- Persistencia de preferencia en localStorage

## 📊 Datos

Los datos se encuentran en `src/app/data/`:
- `Projects.data.ts` - Información de proyectos
- `skills.data.ts` - Habilidades duras y blandas
- `contents.data.ts` - Contenido para el modal (Training, Experience, Referred)

## 🎯 Características del Diseño

- **Tema Dinámico**: Cambio entre tema claro y oscuro con wallpapers
- **Responsive**: Adaptación automática a diferentes tamaños de pantalla
- **Animaciones**: Transiciones suaves y efectos hover
- **Scroll Personalizado**: Scrollbars personalizados para mejor UX
- **Iconos de Habilidades**: Iconos asociados a cada habilidad dura

## 📝 Licencia

Este proyecto es de uso personal.

## 👤 Autor

**Jhojan Danilo Toro Perez**

- GitHub: [@DevJhojan](https://github.com/DevJhojan)
- Portfolio: [https://DevJhojan.github.io/Profile/](https://DevJhojan.github.io/Profile/)

---

Desarrollado con ❤️ usando Angular
