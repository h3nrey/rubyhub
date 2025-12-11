import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div
      class="col-span-full text-center py-12 bg-white dark:bg-dark-50 rounded-lg shadow-md"
      [class]="customClass()"
    >
      <lucide-icon
        [img]="icon()"
        [size]="iconSize()"
        class="mx-auto mb-4 text-gray-400"
      ></lucide-icon>
      <p class="text-gray-500 dark:text-gray-400 text-lg mb-2">{{ title() }}</p>
      @if (description()) {
      <p class="text-gray-400 dark:text-gray-500 text-sm mb-4">{{ description() }}</p>
      } @if (showAction()) {
      <button
        (click)="actionClick.emit()"
        class="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition"
      >
        {{ actionLabel() }}
      </button>
      }
    </div>
  `,
})
export class EmptyStateComponent {
  icon = input.required<LucideIconData>();
  title = input.required<string>();
  description = input<string>('');
  iconSize = input<number>(48);
  showAction = input<boolean>(false);
  actionLabel = input<string>('Action');
  customClass = input<string>('');
  actionClick = output<void>();
}
