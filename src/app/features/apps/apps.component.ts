import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  externalUrl?: string;
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
  apps = signal<App[]>([
    {
      title: 'DojoTime',
      description: 'Gestión completa para escuelas y dojos',
      longDescription: 'Plataforma Flutter para escuelas y dojos que centraliza reservas, pases y horarios. Incluye autenticación con Firebase, gestión multi-tenant, deep links para invitaciones y controles remotos de versión para mantener la app siempre actualizada.',
      technologies: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Remote Config', 'App Links'],
      logo: 'assets/dojotime-logo.png',
      status: 'development',
      color: '#FF6B35'
    },
    {
      title: 'EquiGasto',
      description: 'Reparte gastos fácilmente con tus amigos',
      longDescription: 'Aplicación Flutter para reparto de gastos similar a Splitwise, desarrollada siguiendo Clean Architecture. Incluye autenticación, gestión de grupos, gastos y sistema de deudas. Perfecta para viajes, pisos compartidos o cenas de grupo.',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Riverpod', 'Clean Architecture'],
      logo: 'assets/equigasto-logo.png',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sire.equigasto',
      status: 'released',
      color: '#FF6B35'
    }
  ]);

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
}

