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
    path: 'privacy',
    loadComponent: () => import('./features/privacy/privacy.component').then(m => m.PrivacyComponent),
    title: 'Política de Privacidad | Carajillolabs'
  },
  {
    path: 'equigasto/join/:groupId',
    loadComponent: () => import('./features/join-group/join-group.component').then(m => m.JoinGroupComponent),
    title: 'Unirse al grupo | EquiGasto'
  },
  {
    path: 'escape_room_logger/join/:groupId',
    loadComponent: () => import('./features/join-group/join-group.component').then(m => m.JoinGroupComponent),
    title: 'Unirse al grupo | Escape Room Logger'
  },
  {
    path: 'escaperoomlogger/deleteaccount',
    loadComponent: () => import('./features/delete-account/delete-account.component').then(m => m.DeleteAccountComponent),
    title: 'Eliminar Cuenta | Carajillolabs'
  },
  {
    path: 'ullr/deleteaccount',
    loadComponent: () => import('./features/delete-account/delete-account.component').then(m => m.DeleteAccountComponent),
    title: 'Eliminar Cuenta | Carajillolabs'
  },
  {
    path: 'ejercitia/deleteaccount',
    loadComponent: () => import('./features/delete-account/delete-account.component').then(m => m.DeleteAccountComponent),
    title: 'Eliminar Cuenta | Carajillolabs'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

