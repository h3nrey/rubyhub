import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {{ label() }}
      </label>
      <select
        [ngModel]="value()"
        (ngModelChange)="valueChange.emit($event)"
        class="w-full px-3 py-2 border border-gray-300 dark:border-dark-200 rounded-lg bg-white dark:bg-dark-100 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <option value="">{{ placeholder() }}</option>
        @for (option of options(); track option) {
        <option [value]="option">{{ option }}</option>
        }
      </select>
    </div>
  `,
})
export class SelectFilterComponent {
  label = input.required<string>();
  placeholder = input<string>('All');
  value = input<string>('');
  options = input<string[]>([]);
  valueChange = output<string>();
}
