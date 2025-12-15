import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Frinks & Smithers | Apps Móviles'
  },
  {
    path: 'apps',
    loadComponent: () => import('./features/apps/apps.component').then(m => m.AppsComponent),
    title: 'Nuestras Apps | Frinks & Smithers'
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'Sobre Nosotros | Frinks & Smithers'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

