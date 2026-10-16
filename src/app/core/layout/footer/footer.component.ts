import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="footer-container">
        <p class="footer-text">
          © {{ currentYear() }} <span class="highlight">Carajillolabs</span>
        </p>
        <p class="footer-subtext">
          Un proyecto de <span class="secondary-text">Frink & Smithers</span>
        </p>
        <nav class="footer-legal">
          <a routerLink="/privacy" class="footer-legal-link">Privacidad</a>
          <span class="footer-legal-sep">·</span>
          <a routerLink="/terms" class="footer-legal-link">Términos</a>
          <span class="footer-legal-sep">·</span>
          <a routerLink="/contact" class="footer-legal-link">Contacto</a>
        </nav>
        <p class="footer-subtext-small">
          Hecho con amor, café y alguna birra 🍺
        </p>
      </div>
    </footer>
  `,
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = signal(new Date().getFullYear());
}

