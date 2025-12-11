import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Game } from '../../models/game.models';
import { LucideAngularModule, Gamepad2, ArrowRight } from 'lucide-angular';
import { GameCardComponent } from '../game-card/game-card.component';
import { GamesListCardComponent } from '../games-list-card/games-list-card.component';

@Component({
  selector: 'app-arcade-games-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, GamesListCardComponent, RouterLink],
  templateUrl: './arcade-games-section.component.html',
})
export class ArcadeGamesSectionComponent {
  games = input.required<Game[]>();
  arcadeId = input.required<number>();
  isLoading = input.required<boolean>();

  readonly Gamepad2 = Gamepad2;
  readonly ArrowRight = ArrowRight;
}
