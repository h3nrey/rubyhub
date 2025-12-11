import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="bg-white dark:bg-dark-50 rounded-lg shadow-md p-6 mb-8">
      <div class="flex items-center gap-3 mb-2">
        @if (icon()) {
        <lucide-icon [img]="icon()!" [size]="iconSize()" [class]="iconColorClass()"></lucide-icon>
        }
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">{{ title() }}</h1>
      </div>
      @if (description()) {
      <p class="text-gray-600 dark:text-gray-400">{{ description() }}</p>
      }
    </div>
  `,
})
export class PageHeaderComponent {
  title = input.required<string>();
  description = input<string>('');
  icon = input<LucideIconData | null>(null);
  iconSize = input<number>(32);
  iconColorClass = input<string>('text-primary-600 dark:text-primary-500');
}
