import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <button
      (click)="backClick.emit()"
      class="flex items-center gap-2 mb-6 text-primary-600 dark:text-primary-500 hover:text-primary-700 dark:hover:text-primary-400 transition"
    >
      <lucide-icon [img]="ArrowLeft" [size]="20"></lucide-icon>
      <span class="font-semibold">{{ label() }}</span>
    </button>
  `,
})
export class BackButtonComponent {
  readonly ArrowLeft = ArrowLeft;
  label = input<string>('Back');
  backClick = output<void>();
}
