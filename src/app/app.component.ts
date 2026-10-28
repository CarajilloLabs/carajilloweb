import { Component, computed, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    @if (!isStandaloneRoute()) {
      <app-header />
    }
    <main class="main-content" [class.standalone-main]="isStandaloneRoute()">
      <router-outlet />
    </main>
    @if (!isStandaloneRoute()) {
      <app-footer />
    }
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .main-content {
      flex: 1;
    }

    .standalone-main {
      padding: 0;
    }
  `]
})
export class AppComponent {
  private router = inject(Router);

  private currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(event => event.urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  isStandaloneRoute = computed(() => {
    const url = this.currentUrl();
    return url ? url.startsWith('/sif') : false;
  });
}

