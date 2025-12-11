import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-active-filters',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (hasActiveFilters()) {
    <div class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-dark-200">
      <span class="text-sm text-gray-600 dark:text-gray-400">{{ label() }}:</span>
      <ng-content />
    </div>
    }
  `,
})
export class ActiveFiltersComponent {
  label = input<string>('Active filters');
  hasActiveFilters = input<boolean>(true);
}
