import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

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
  email = signal('');
  reason = signal('');
  confirmed = signal(false);
  isSubmitting = signal(false);
  isSubmitted = signal(false);

  onSubmit(): void {
    if (!this.email() || !this.confirmed()) {
      return;
    }

    this.isSubmitting.set(true);
    
    // Mock: simular petición
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSubmitted.set(true);
    }, 1500);
  }

  reset(): void {
    this.email.set('');
    this.reason.set('');
    this.confirmed.set(false);
    this.isSubmitted.set(false);
  }
}

