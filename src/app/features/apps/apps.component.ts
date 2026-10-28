import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

interface App {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  logo: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  externalUrl?: string;
  landingUrl?: string;
  status: 'released' | 'development' | 'coming-soon';
  color: string;
}

@Component({
  selector: 'app-apps',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, TagModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './apps.component.html',
  styleUrl: './apps.component.scss'
})
export class AppsComponent {
  private router = inject(Router);
  apps = signal<App[]>(this.getSortedApps());

  private getSortedApps(): App[] {
    const appsData: App[] = [
      {
        title: 'Sif',
        description: 'Plataforma clínica y app móvil para nutricionistas',
        longDescription: 'Software de gestión clínica y marca blanca para centros y profesionales de la nutrición. Incluye composición corporal segmental, planes sobre base BEDCA con 48 nutrientes, control de citas anti-ausencias y app móvil para pacientes.',
        technologies: ['Flutter', 'Angular', 'BEDCA', 'OneSignal', 'Multi-tenant'],
        logo: 'assets/sif/logo-sif.svg',
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.carajillolabs.sif',
        landingUrl: '/sif',
        status: 'released',
        color: '#E06316'
      },
      {
        title: 'EquiGasto',
        description: 'Reparte gastos fácilmente con tus amigos',
        longDescription: 'Aplicación Flutter para reparto de gastos similar a Splitwise, desarrollada siguiendo Clean Architecture. Incluye autenticación, gestión de grupos, gastos y sistema de deudas. Perfecta para viajes, pisos compartidos o cenas de grupo. Cuentas claras, amigos para siempre.',
        technologies: ['Flutter', 'Dart', 'Firebase', 'Riverpod', 'Clean Architecture'],
        logo: 'assets/equigasto-logo.png',
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sire.equigasto',
        appStoreUrl: 'https://apps.apple.com/es/app/equigasto/id6757721713',
        status: 'released',
        color: '#FF6B35'
      },
      {
        title: 'Ullr',
        description: 'Gestión completa para escuelas y dojos',
        longDescription: 'Plataforma Flutter para escuelas y dojos que centraliza reservas, pases y horarios. Incluye autenticación con Firebase, gestión multi-tenant, deep links para invitaciones y controles remotos de versión para mantener la app siempre actualizada.',
        technologies: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Remote Config', 'App Links'],
        logo: 'assets/ullr-logo.png',
        status: 'development',
        color: '#FF6B35'
      },
      {
        title: 'Escape Room Logger',
        description: 'Gestiona y descubre Escape Rooms',
        longDescription: 'Aplicación Flutter para gestionar y descubrir Escape Rooms. Incluye mapa interactivo con marcadores, sistema de valoraciones y reseñas, gestión de perfil de usuario, registro para empresas y soporte para tema claro y oscuro. Desarrollada con Clean Architecture y Material Design 3.',
        technologies: ['Flutter', 'Dart', 'Firebase', 'Riverpod', 'Clean Architecture', 'GoRouter', 'Maps'],
        logo: 'assets/escaperadar-logo.png',
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.carajillolabs.erl',
        appStoreUrl: 'https://apps.apple.com/es/app/escape-room-logger/id6758017169',
        status: 'released',
        color: '#6366F1'
      }
    ];

    return [...appsData].sort((a, b) => {
      // Ordenar: primero 'released', luego 'development', luego 'coming-soon'
      const statusOrder: Record<App['status'], number> = { 
        'released': 0, 
        'development': 1, 
        'coming-soon': 2 
      };
      return (statusOrder[a.status] ?? 999) - (statusOrder[b.status] ?? 999);
    });
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'released': 'Disponible',
      'development': 'En desarrollo',
      'coming-soon': 'Próximamente'
    };
    return labels[status] || status;
  }

  getStatusSeverity(status: string): 'success' | 'info' | 'warn' {
    const severities: Record<string, 'success' | 'info' | 'warn'> = {
      'released': 'success',
      'development': 'info',
      'coming-soon': 'warn'
    };
    return severities[status] || 'info';
  }

  openLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  navigateTo(url: string): void {
    this.router.navigateByUrl(url);
  }
}

