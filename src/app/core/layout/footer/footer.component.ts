import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
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

