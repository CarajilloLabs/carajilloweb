import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header">
      <div class="header-container">
        <a routerLink="/" class="logo">
          <img src="assets/carajillolabs-logo.png" alt="Carajillolabs" class="logo-img" />
        </a>
        
        <nav class="nav">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">
            Inicio
          </a>
          <a routerLink="/apps" routerLinkActive="active" class="nav-link">
            Apps
          </a>
          <a routerLink="/about" routerLinkActive="active" class="nav-link">
            Sobre Nosotros
          </a>
          <a routerLink="/contact" routerLinkActive="active" class="nav-link">
            Contacto
          </a>
        </nav>
      </div>
    </header>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {}

