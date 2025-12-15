import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="footer-container">
        <p class="footer-text">
          © {{ currentYear() }} <span class="highlight">Frinks & Smithers</span>
        </p>
        <p class="footer-subtext">
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

