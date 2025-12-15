# Frinks & Smithers

🚀 Proyecto indie de desarrollo de aplicaciones móviles

## 🎯 Sobre el proyecto

**Frinks & Smithers** no es una empresa, es un proyecto personal entre dos desarrolladores apasionados por crear aplicaciones móviles útiles y bien diseñadas.

Sin oficinas corporativas, sin jerarquías absurdas. Solo código limpio, buenas prácticas y mucho café.

## 📱 Nuestras Apps

### DojoTime
Plataforma Flutter para escuelas y dojos que centraliza reservas, pases y horarios.
- 🔐 Autenticación con Firebase
- 🏢 Gestión multi-tenant
- 🔗 Deep links para invitaciones
- ⚙️ Remote Config para versiones
- **Estado:** En desarrollo

### EquiGasto
Aplicación Flutter para reparto de gastos, perfecta para viajes y gastos compartidos.
- 💰 Sistema de reparto de gastos
- 👥 Gestión de grupos
- 📊 Sistema de deudas
- 🏗️ Clean Architecture
- **Estado:** Disponible en Play Store

## 🛠️ Stack Tecnológico

### Frontend Web
- Angular 21
- TypeScript
- SCSS
- PrimeNG + PrimeFlex + PrimeIcons
- Standalone Components
- Signals

### Apps Móviles
- Flutter
- Dart
- Firebase (Auth, Firestore, Remote Config)
- Riverpod
- Clean Architecture

## 🚀 Desarrollo

### Requisitos
- Node.js 18+
- Angular CLI 21+

### Instalación

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm start

# Build de producción
npm run build
```

## 📂 Estructura del proyecto

```
src/
├── app/
│   ├── core/              # Layout y servicios globales
│   │   └── layout/        # Header y Footer
│   ├── features/          # Páginas principales
│   │   ├── home/          # Página de inicio
│   │   ├── apps/          # Listado de apps
│   │   └── about/         # Sobre nosotros
│   ├── shared/            # Componentes reutilizables
│   ├── app.component.ts   # Componente raíz
│   ├── app.config.ts      # Configuración de la app
│   └── app.routes.ts      # Rutas con lazy loading
└── assets/                # Imágenes y recursos
```

## 🎨 Características

- ✅ **Mobile-first**: Diseñado primero para móviles
- ✅ **Lazy Loading**: Carga optimizada por rutas
- ✅ **OnPush Strategy**: Mejor rendimiento
- ✅ **Signals**: Gestión de estado reactiva
- ✅ **SEO Ready**: Meta tags y títulos configurados
- ✅ **Animaciones**: Transiciones suaves y modernas
- ✅ **Dark Theme**: Diseño oscuro minimalista

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contacto

- GitHub: [frinks-smithers](https://github.com/frinks-smithers)

---

Hecho con ❤️ y mucho ☕

