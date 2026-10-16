import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { LEGAL_CONTACT_EMAIL } from '../../shared/legal-version';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.scss'
})
export class DeleteAccountComponent {
  protected readonly contactEmail = LEGAL_CONTACT_EMAIL;

  email = signal('');
  reason = signal('');
  confirmed = signal(false);
  isSubmitting = signal(false);
  isSubmitted = signal(false);

  /**
   * Envía la solicitud abriendo el cliente de correo con el mensaje ya
   * redactado.
   *
   * <p>Esta página no tiene servidor detrás, así que el correo es el único
   * canal que de verdad llega a alguien. Antes el formulario simulaba el envío
   * con un `setTimeout` y respondía «hemos recibido tu solicitud» sin mandar
   * nada: una petición del artículo 17 del RGPD que se perdía, y encima
   * confirmada al usuario. Ahora la pantalla final explica qué ha pasado de
   * verdad y deja la dirección a la vista por si el cliente de correo no se
   * abre.</p>
   */
  onSubmit(): void {
    if (!this.email() || !this.confirmed()) {
      return;
    }

    this.isSubmitting.set(true);

    const subject = 'Solicitud de eliminación de cuenta';
    const body = [
      'Solicito la eliminación de mi cuenta y de todos mis datos asociados.',
      '',
      `Correo de la cuenta: ${this.email()}`,
      this.reason() ? `Motivo: ${this.reason()}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    window.location.href =
      `mailto:${this.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    this.isSubmitting.set(false);
    this.isSubmitted.set(true);
  }

  reset(): void {
    this.email.set('');
    this.reason.set('');
    this.confirmed.set(false);
    this.isSubmitted.set(false);
  }
}
