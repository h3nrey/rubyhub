import {
  Component,
  inject,
  signal,
  ChangeDetectionStrategy,
  computed,
  effect,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArcadeService } from '../../services/arcade.service';
import { GameService } from '../../services/game.service';
import { Arcade } from '../../models/arcade.models';
import { Game } from '../../models/game.models';
import {
  LucideAngularModule,
  ArrowLeft,
  ArrowRight,
  Wifi,
  WifiOff,
  Users,
  Trophy,
  Gamepad2,
} from 'lucide-angular';
import { ToastrService } from 'ngx-toastr';
import { GameCardComponent } from '../../components/game-card/game-card.component';

@Component({
  selector: 'app-arcade-detail',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, GameCardComponent, RouterLink],
  templateUrl: './arcade-detail.html',
  styleUrl: './arcade-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArcadeDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private arcadeService = inject(ArcadeService);
  private gameService = inject(GameService);

  readonly ArrowLeft = ArrowLeft;
  readonly ArrowRight = ArrowRight;
  readonly Wifi = Wifi;
  readonly WifiOff = WifiOff;
  readonly Users = Users;
  readonly Trophy = Trophy;
  readonly Gamepad2 = Gamepad2;

  arcade = signal<Arcade | null>(null);
  games = signal<Game[]>([]);
  isLoading = signal(false);
  gamesLoading = signal(false);

  constructor() {
    effect(() => {
      untracked(() => this.loadArcade());
    });

    effect(() => {
      const arcade = this.arcade();
      if (arcade) {
        untracked(() => this.loadGames(arcade.id));
      }
    });
  }

  private loadArcade(): void {
    const arcadeId = this.route.snapshot.paramMap.get('id');
    if (!arcadeId) {
      this.toastr.error('Arcade not found');
      this.router.navigate(['/arcades']);
      return;
    }

    this.isLoading.set(true);
    this.arcadeService.getById(Number(arcadeId)).subscribe({
      next: (arcade) => {
        this.arcade.set(arcade);
        this.isLoading.set(false);
      },
      error: () => {
        this.toastr.error('Failed to load arcade', 'Error');
        this.isLoading.set(false);
        this.router.navigate(['/arcades']);
      },
    });
  }

  private loadGames(arcadeId: number): void {
    this.gamesLoading.set(true);
    this.gameService.getByArcadeId(arcadeId).subscribe({
      next: (response) => {
        const gamesList = Array.isArray(response) ? response : (response as any).data || [];
        this.games.set(gamesList);
        this.gamesLoading.set(false);
      },
      error: () => {
        this.toastr.error('Failed to load games', 'Error');
        this.gamesLoading.set(false);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/arcades']);
  }
}
