import {
  Component,
  inject,
  signal,
  ChangeDetectionStrategy,
  effect,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';
import { ArcadeService } from '../../services/arcade.service';
import { Game } from '../../models/game.models';
import { Arcade } from '../../models/arcade.models';
import {
  LucideAngularModule,
  ArrowLeft,
  Star,
  Calendar,
  User,
  Tag,
  Gamepad2,
} from 'lucide-angular';
import { ToastrService } from 'ngx-toastr';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { BackButtonComponent } from '../../components/back-button/back-button.component';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    RouterLink,
    LoadingSpinnerComponent,
    BackButtonComponent,
  ],
  templateUrl: './game-detail.html',
  styleUrl: './game-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private gameService = inject(GameService);
  private arcadeService = inject(ArcadeService);

  readonly ArrowLeft = ArrowLeft;
  readonly Star = Star;
  readonly Calendar = Calendar;
  readonly User = User;
  readonly Tag = Tag;
  readonly Gamepad2 = Gamepad2;

  game = signal<Game | null>(null);
  arcade = signal<Arcade | null>(null);
  isLoading = signal(false);
  arcadeId = signal<number | null>(null);
  gameId = signal<number | null>(null);

  constructor() {
    effect(() => {
      const arcadeId = this.route.snapshot.paramMap.get('arcadeId');
      const gameId = this.route.snapshot.paramMap.get('gameId');

      if (arcadeId && gameId) {
        this.arcadeId.set(Number(arcadeId));
        this.gameId.set(Number(gameId));

        untracked(() => {
          this.loadGame(Number(arcadeId), Number(gameId));
          this.loadArcade(Number(arcadeId));
        });
      }
    });
  }

  private loadGame(arcadeId: number, gameId: number): void {
    this.isLoading.set(true);

    this.gameService.getByArcadeId(arcadeId).subscribe({
      next: (response) => {
        const games = Array.isArray(response) ? response : response.data || [];
        const foundGame = games.find((g) => g.id === gameId);

        if (foundGame) {
          this.game.set(foundGame);
        } else {
          this.toastr.error('Game not found');
          this.goBack();
        }

        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading game:', error);
        this.toastr.error('Error loading game');
        this.isLoading.set(false);
        this.goBack();
      },
    });
  }

  private loadArcade(arcadeId: number): void {
    this.arcadeService.getById(arcadeId).subscribe({
      next: (arcade) => {
        this.arcade.set(arcade);
      },
      error: (error) => {
        console.error('Error loading arcade:', error);
      },
    });
  }

  goBack(): void {
    const arcadeId = this.arcadeId();
    if (arcadeId) {
      this.router.navigate(['/arcades', arcadeId]);
    } else {
      this.router.navigate(['/arcades']);
    }
  }

  getRatingStars(): number[] {
    const rating = this.game()?.rating || 0;
    const filledStars = Math.round(rating);
    return Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (i <= filledStars ? 1 : 0));
  }
}
