import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game.models';
import { LucideAngularModule, Star } from 'lucide-angular';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div
      class="bg-white dark:bg-dark-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group"
    >
      <!-- Cover Image or Placeholder -->
      <div
        class="h-32 bg-gradient-to-r from-primary-400 to-primary-500 flex items-center justify-center"
      >
        @if (game().cover_image) {
        <img
          [src]="game().cover_image"
          alt="{{ game().name }}"
          class="w-full h-full object-cover"
        />
        } @else {
        <div class="text-center">
          <p class="text-white/80 text-sm font-semibold">{{ game().genre }}</p>
        </div>
        }
      </div>

      <!-- Content -->
      <div class="p-4">
        <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-1 line-clamp-1">
          {{ game().name }}
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ game().developer }}</p>

        <!-- Description -->
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {{ game().description }}
        </p>

        <!-- Metadata -->
        <div class="flex justify-between items-center">
          <span
            class="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-2 py-1 rounded"
          >
            {{ game().release_year }}
          </span>
          <div class="flex items-center gap-1">
            <lucide-icon [img]="Star" [size]="16" class="text-yellow-500"></lucide-icon>
            <span class="text-sm font-semibold text-gray-800 dark:text-white">
              {{ game().rating | number : '1.1-1' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class GameCardComponent {
  game = input.required<Game>();
  readonly Star = Star;
}
