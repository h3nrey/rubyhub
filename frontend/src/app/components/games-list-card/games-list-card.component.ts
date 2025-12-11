import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Game } from '../../models/game.models';
import { LucideAngularModule, Star } from 'lucide-angular';

@Component({
  selector: 'app-games-list-card',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './games-list-card.component.html',
})
export class GamesListCardComponent {
  game = input.required<Game>();
  readonly Star = Star;
}
