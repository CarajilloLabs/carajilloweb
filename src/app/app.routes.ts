import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Carajillolabs | Desarrollo de Apps Móviles'
  },
  {
    path: 'apps',
    loadComponent: () => import('./features/apps/apps.component').then(m => m.AppsComponent),
    title: 'Nuestras Apps | Carajillolabs'
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'Sobre Nosotros | Carajillolabs'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

