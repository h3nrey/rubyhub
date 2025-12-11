import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-filter-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="bg-white dark:bg-dark-50 rounded-lg shadow-md p-6 mb-8">
      <!-- Search and Toggle Bar -->
      <div class="flex gap-4 mb-4">
        <ng-content select="[search]" />
        @if (showToggle()) {
        <button
          (click)="toggleClick.emit()"
          class="px-4 py-2 bg-gray-100 dark:bg-dark-100 hover:bg-gray-200 dark:hover:bg-dark-200 text-gray-700 dark:text-gray-300 rounded-lg transition flex items-center gap-2"
        >
          <lucide-icon [img]="toggleIcon()!" [size]="20"></lucide-icon>
          <span class="hidden sm:inline">{{ toggleLabel() }}</span>
        </button>
        }
      </div>

      <!-- Expandable Filters -->
      @if (expanded()) {
      <div class="pt-4 border-t border-gray-200 dark:border-dark-200">
        <ng-content select="[filters]" />
      </div>
      }

      <!-- Active Filters -->
      <ng-content select="[active]" />
    </div>
  `,
})
export class FilterSectionComponent {
  expanded = input<boolean>(false);
  showToggle = input<boolean>(true);
  toggleLabel = input<string>('Filters');
  toggleIcon = input<LucideIconData | null>(null);
  toggleClick = output<void>();
}
