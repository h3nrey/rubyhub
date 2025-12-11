import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="flex justify-center items-center py-12">
      <div class="animate-spin" [class]="iconColorClass()">
        <lucide-icon [img]="icon()" [size]="size()"></lucide-icon>
      </div>
    </div>
  `,
})
export class LoadingSpinnerComponent {
  icon = input.required<LucideIconData>();
  size = input<number>(48);
  iconColorClass = input<string>('text-primary-600 dark:text-primary-500');
}
