import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';

type AppType = 'equigasto' | 'dojotime' | 'escaperadar';

interface AppConfig {
  name: string;
  description: string;
  logo: string;
  playStoreUrl: string;
  deepLinkScheme: string;
  installCta: string;
}

const APP_CONFIG: Record<AppType, AppConfig> = {
  equigasto: {
    name: 'EquiGasto',
    description: 'Has sido invitado a unirte a un grupo en EquiGasto.',
    logo: 'assets/equigasto-logo.png',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sire.equigasto',
    deepLinkScheme: 'equigasto://app/join/',
    installCta: 'Instalar EquiGasto'
  },
  dojotime: {
    name: 'DojoTime',
    description: 'Has sido invitado a unirte al dojo en DojoTime.',
    logo: 'assets/dojotime-logo.png',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sire.dojotime',
    deepLinkScheme: 'dojotime://app/join/',
    installCta: 'Instalar DojoTime'
  },
  escaperadar: {
    name: 'Escape Room Logger',
    description: 'Has sido invitado a unirte a un grupo en Escape Room Logger.',
    logo: 'assets/escaperadar-logo.png',
    playStoreUrl: '',
    deepLinkScheme: 'escaperadar://groups/join/',
    installCta: 'Instalar Escape Room Logger'
  }
};

@Component({
  selector: 'app-join-group',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, MessageModule],
  templateUrl: './join-group.component.html',
  styleUrl: './join-group.component.scss'
})
export class JoinGroupComponent implements OnInit {
  groupId: string | null = null;
  appConfig: AppConfig = APP_CONFIG.equigasto;
  copied = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.resolveAppConfig();
    this.groupId = this.route.snapshot.paramMap.get('groupId');
    
    if (!this.groupId) {
      this.router.navigate(['/']);
      return;
    }
  }

  private resolveAppConfig() {
    const path = window.location.pathname;
    
    if (path.includes('/dojotime/')) {
      this.appConfig = APP_CONFIG.dojotime;
    } else if (path.includes('/escaperadar/') || path.includes('/escaperoomlogger/')) {
      this.appConfig = APP_CONFIG.escaperadar;
    } else {
      this.appConfig = APP_CONFIG.equigasto;
    }
  }

  tryOpenApp(userInitiated = false) {
    if (!this.groupId) return;

    const deepLink = `${this.appConfig.deepLinkScheme}${this.groupId}`;
    
    window.location.href = deepLink;

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
    window.open(this.appConfig.playStoreUrl, '_blank', 'noopener,noreferrer');
  }

  copyCode() {
    if (this.groupId) {
      navigator.clipboard.writeText(this.groupId).then(() => {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      });
    }
  }
}

