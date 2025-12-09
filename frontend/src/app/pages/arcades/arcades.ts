import { Component, inject, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ArcadeService } from '../../services/arcade.service';
import { Arcade } from '../../models/arcade.models';
import { LucideAngularModule, Gamepad2, Plus, Filter, Wifi, WifiOff } from 'lucide-angular';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-arcades',
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './arcades.html',
  styleUrl: './arcades.scss',
})
export class Arcades {
  private arcadeService = inject(ArcadeService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private loadSubscription?: Subscription;

  readonly Gamepad2 = Gamepad2;
  readonly Plus = Plus;
  readonly Filter = Filter;
  readonly Wifi = Wifi;
  readonly WifiOff = WifiOff;

  arcades: Arcade[] = [];
  isLoading = false;
  filters = {
    online: undefined as boolean | undefined,
    theme: '' as string,
  };

  constructor() {
    // Load arcades only on client side to avoid SSR issues
    this.loadArcades();
  }

  loadArcades(): void {
    if (this.loadSubscription) {
      this.loadSubscription.unsubscribe();
    }

    console.log('loading arcades');
    this.isLoading = true;
    const filters: any = {};

    if (this.filters.online !== undefined) {
      filters.online = this.filters.online;
    }

    if (this.filters.theme) {
      filters.theme = this.filters.theme;
    }

    this.loadSubscription = this.arcadeService.getAll(filters).subscribe({
      next: (arcades) => {
        console.log('Arcades loaded:', arcades);
        this.arcades = arcades;
        this.isLoading = false;
        this.loadSubscription = undefined;
      },
      error: (error) => {
        console.error('Error loading arcades:', error);
        this.toastr.error('Failed to load arcades', 'Error');
        this.isLoading = false;
        this.loadSubscription = undefined;
      },
    });
  }

  filterByOnline(online: boolean | undefined): void {
    this.filters.online = online;
    this.loadArcades();
  }

  clearFilters(): void {
    this.filters = {
      online: undefined,
      theme: '',
    };
    this.loadArcades();
  }

  deleteArcade(id: number): void {
    if (confirm('Are you sure you want to delete this arcade?')) {
      this.arcadeService.delete(id).subscribe({
        next: () => {
          this.toastr.success('Arcade deleted successfully', 'Success');
          this.loadArcades();
        },
        error: (error) => {
          this.toastr.error('Failed to delete arcade', 'Error');
        },
      });
    }
  }
}
