# Portfolio Backend - Administración

Versión editable del portafolio personal con autenticación Firebase y funcionalidad de edición en tiempo real.

## 🚀 Características

- ✅ **Autenticación única**: Solo tú puedes acceder para editar
- ✅ **Edición en tiempo real**: Todos los cambios se guardan en Firebase Realtime Database
- ✅ **Secciones editables**: 
  - Proyectos (agregar, editar, eliminar)
  - Habilidades (agregar, eliminar)
  - Formación, Experiencia y Referencias (agregar, editar, eliminar)
- ✅ **Mismo diseño**: Estilos y colores idénticos a la versión front
- ✅ **Imagen de perfil**: No editable (como se solicitó)

## 🔧 Configuración

### 1. Instalación de dependencias

```bash
npm install
```

### 2. Configuración de Firebase

La configuración de Firebase ya está incluida en `src/app/services/firebase.config.ts`. La aplicación está conectada a:
- **Realtime Database**: `https://profile-cd57b-default-rtdb.firebaseio.com/`

### 3. Configurar usuario en Firebase Authentication

1. Ve a la [Consola de Firebase](https://console.firebase.google.com/)
2. Selecciona el proyecto `profile-cd57b`
3. Ve a **Authentication** > **Sign-in method**
4. Habilita **Email/Password**
5. Crea un usuario con tu email y contraseña

### 4. Estructura de datos en Firebase

Los datos se guardan en la siguiente estructura:

```
portfolio/
  ├── projects/     # Array de proyectos
  ├── skills/       # Array de grupos de habilidades
  └── contents/     # Array de contenidos (formación, experiencia, referencias)
```

## 🏃 Iniciar la aplicación

```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200/`

## 📝 Uso

### Iniciar sesión

1. Navega a `http://localhost:4200/`
2. Serás redirigido automáticamente a `/login`
3. Ingresa tu email y contraseña de Firebase

### Editar Proyectos

1. Una vez autenticado, verás botones de edición en cada proyecto
2. Haz clic en el botón ✏️ para editar
3. Haz clic en el botón 🗑️ para eliminar
4. Usa el botón **+** en el header de proyectos para agregar uno nuevo

### Editar Habilidades

1. En la sección de habilidades, usa el campo de texto y el botón **+** para agregar habilidades
2. Haz clic en **×** en cada habilidad para eliminarla

### Editar Formación/Experiencia/Referencias

1. Haz clic en "Más sobre mí" para abrir el modal
2. En modo edición verás botones ✏️ y 🗑️ en cada elemento
3. Usa el botón **+ Agregar** para añadir nuevos elementos

### Cerrar sesión

Haz clic en el botón **Logout** en la parte superior derecha.

## 🔒 Seguridad

- Las rutas están protegidas con `authGuard`
- Solo usuarios autenticados pueden ver y editar el contenido
- La autenticación se gestiona mediante Firebase Authentication

## 🎨 Estilos

Los estilos son idénticos a la versión `front`, incluyendo:
- Tema claro/oscuro
- Wallpapers dinámicos
- Diseño responsive
- Animaciones y transiciones

## 📦 Tecnologías

- **Angular 20.3.4**
- **Firebase SDK 10.13.0**
  - Authentication
  - Realtime Database
- **TypeScript 5.9.2**
- **RxJS 7.8.0**

## 🛠️ Scripts disponibles

- `npm start` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm test` - Ejecutar pruebas

## 📝 Notas

- Los datos se inicializan automáticamente con los datos por defecto si Firebase está vacío
- Todos los cambios se guardan automáticamente en Firebase en tiempo real
- La imagen de perfil no es editable (como se solicitó)
