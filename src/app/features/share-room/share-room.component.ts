import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

interface AppConfig {
  name: string;
  description: string;
  logo: string;
  playStoreUrl: string;
  deepLinkScheme: string;
  installCta: string;
}

const ESCAPE_RADAR_CONFIG: AppConfig = {
  name: 'Escape Room Logger',
  description: 'Te han invitado a ver una sala en Escape Room Logger.',
  logo: 'assets/escaperadar-logo.png',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.carajillolabs.erl',
  deepLinkScheme: 'escaperadar://app/escape-room/',
  installCta: 'Instalar Escape Room Logger'
};

@Component({
  selector: 'app-share-room',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './share-room.component.html',
  styleUrl: './share-room.component.scss'
})
export class ShareRoomComponent implements OnInit {
  roomId: string | null = null;
  appConfig: AppConfig = ESCAPE_RADAR_CONFIG;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    
    if (!this.roomId) {
      this.router.navigate(['/']);
    }
  }

  tryOpenApp(userInitiated = false) {
    if (!this.roomId) return;

    // This native deep link forces the app to open.
    const deepLink = `${this.appConfig.deepLinkScheme}${this.roomId}`;
    
    globalThis.location.href = deepLink;

    if (userInitiated) {
      setTimeout(() => {
        const isStillVisible = document.visibilityState === 'visible';
        if (isStillVisible) {
          this.openPlayStore();
        }
      }, 1800);
    }
  }

  openPlayStore() {
    globalThis.open(this.appConfig.playStoreUrl, '_blank', 'noopener,noreferrer');
  }
}
