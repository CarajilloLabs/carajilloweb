import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LEGAL_CONTACT_EMAIL, LEGAL_LAST_UPDATED, LEGAL_VERSION } from '../../shared/legal-version';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss'
})
export class TermsComponent {
  protected readonly version = LEGAL_VERSION;
  protected readonly lastUpdated = LEGAL_LAST_UPDATED;
  protected readonly contactEmail = LEGAL_CONTACT_EMAIL;
}
