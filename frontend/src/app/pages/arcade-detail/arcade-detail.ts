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
import { Arcade } from '../../models/arcade.models';
import {
  LucideAngularModule,
  ArrowLeft,
  Wifi,
  WifiOff,
  Users,
  Trophy,
  Gamepad2,
} from 'lucide-angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-arcade-detail',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './arcade-detail.html',
  styleUrl: './arcade-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArcadeDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private arcadeService = inject(ArcadeService);

  readonly ArrowLeft = ArrowLeft;
  readonly Wifi = Wifi;
  readonly WifiOff = WifiOff;
  readonly Users = Users;
  readonly Trophy = Trophy;
  readonly Gamepad2 = Gamepad2;

  arcade = signal<Arcade | null>(null);
  isLoading = signal(false);

  constructor() {
    effect(() => {
      untracked(() => this.loadArcade());
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

  goBack(): void {
    this.router.navigate(['/arcades']);
  }
}
