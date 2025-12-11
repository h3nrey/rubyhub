import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results-count',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-4">
      <p class="text-gray-600 dark:text-gray-400">
        Showing <span class="font-semibold">{{ current() }}</span> of
        <span class="font-semibold">{{ total() }}</span> {{ label() }}
      </p>
    </div>
  `,
})
export class ResultsCountComponent {
  current = input.required<number>();
  total = input.required<number>();
  label = input<string>('results');
}
