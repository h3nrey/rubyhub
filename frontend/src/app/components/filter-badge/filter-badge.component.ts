import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-medium"
    >
      {{ label() }}: <span class="font-semibold">{{ value() }}</span>
    </span>
  `,
})
export class FilterBadgeComponent {
  label = input.required<string>();
  value = input.required<string>();
}
