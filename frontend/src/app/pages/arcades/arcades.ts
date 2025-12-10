import { Component, inject, signal, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ArcadeService } from '../../services/arcade.service';
import { Arcade } from '../../models/arcade.models';
import { LucideAngularModule, Gamepad2, Plus } from 'lucide-angular';
import { ToastrService } from 'ngx-toastr';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ArcadeCardComponent } from '../../components/arcade-card/arcade-card.component';
import { ArcadeFiltersComponent } from '../../components/arcade-filters/arcade-filters.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';

@Component({
  selector: 'app-arcades',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    SearchInputComponent,
    ArcadeCardComponent,
    ArcadeFiltersComponent,
    PaginatorComponent,
  ],
  templateUrl: './arcades.html',
  styleUrl: './arcades.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Arcades {
  private router = inject(Router);
  private toastr = inject(ToastrService);

  readonly Gamepad2 = Gamepad2;
  readonly Plus = Plus;

  allArcades = signal<Arcade[]>([]);
  isLoading = signal(false);
  totalCount = signal(0);

  // Pagination
  currentPage = signal(1);
  itemsPerPage = signal(9);

  // Filters and search
  filters = signal({
    online: undefined as boolean | undefined,
    theme: '' as string,
    search: '' as string,
  });

  // Computed total pages
  totalPages = computed(() => {
    return Math.ceil(this.totalCount() / this.itemsPerPage());
  });

  constructor(private readonly arcadeService: ArcadeService) {
    this.loadArcades();
  }

  ngOnInit() {
    // Additional initialization if needed
  }

  private applyFilters(): void {
    this.currentPage.set(1); // Reset to first page when filtering
    this.loadArcades();
  }

  loadArcades(): void {
    this.isLoading.set(true);
    const currentFilters = this.filters();
    const filterParams: any = {
      page: this.currentPage(),
      per_page: this.itemsPerPage(),
    };

    if (currentFilters.online !== undefined) {
      filterParams.online = currentFilters.online;
    }

    if (currentFilters.theme) {
      filterParams.theme = currentFilters.theme;
    }

    if (currentFilters.search) {
      filterParams.search = currentFilters.search;
    }

    try {
      this.arcadeService.getAll(filterParams).subscribe({
        next: (response: any) => {
          console.log('Arcades loaded:', response);
          // Handle both array response and paginated response
          if (Array.isArray(response)) {
            this.allArcades.set(response);
            this.totalCount.set(response.length);
          } else {
            // If API returns paginated object with data and total
            this.allArcades.set(response.data || response.arcades || []);
            this.totalCount.set(response.total || response.count || 0);
          }
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error loading arcades:', error);
          this.toastr.error('Failed to load arcades', 'Error');
          this.isLoading.set(false);
        },
      });
    } catch (error) {
      console.error('Error initiating arcades load:', error);
      this.isLoading.set(false);
    }
  }

  onSearchChange(search: string): void {
    this.filters.update((f) => ({ ...f, search }));
    this.applyFilters();
  }

  filterByOnline(online: boolean | undefined): void {
    this.filters.update((f) => ({ ...f, online }));
    this.applyFilters();
  }

  clearFilters(): void {
    this.filters.set({
      online: undefined,
      theme: '',
      search: '',
    });
    this.applyFilters();
  }

  goToArcadeDetail(arcadeId: number): void {
    this.router.navigate(['/arcades', arcadeId]);
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
      this.loadArcades();
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((p) => p + 1);
      this.loadArcades();
    }
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
