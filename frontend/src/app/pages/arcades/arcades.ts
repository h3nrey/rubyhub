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
import { Router, RouterLink } from '@angular/router';
import { ArcadeService, ArcadeFilterRequest } from '../../services/arcade.service';
import { Arcade } from '../../models/arcade.models';
import { PaginationResponse } from '../../models/common.models';
import { LucideAngularModule, Gamepad2, Plus } from 'lucide-angular';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

  private filters = signal<ArcadeFilterRequest>({
    page: 1,
    per_page: 9,
    search: '',
  });

  allArcades = signal<Arcade[]>([]);
  isLoading = signal(false);
  totalCount = signal(0);
  totalPages = computed(() => Math.ceil(this.totalCount() / this.filters().per_page));
  currentPage = computed(() => this.filters().page);

  private searchSubject = new Subject<string>();

  constructor(private readonly arcadeService: ArcadeService) {
    this.searchSubject.pipe(debounceTime(300), takeUntilDestroyed()).subscribe((search) => {
      this.filters.update((f) => ({ ...f, search, page: 1 }));
    });

    effect(() => {
      this.filters();
      untracked(() => this.loadArcades());
    });
  }

  private loadArcades(): void {
    this.isLoading.set(true);
    const filterParams = this.filters();

    this.arcadeService.getAll(filterParams).subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.allArcades.set(response);
          this.totalCount.set(response.length);
        } else {
          const paginatedResponse = response as PaginationResponse<Arcade>;
          this.allArcades.set(paginatedResponse.data || []);
          this.totalCount.set(paginatedResponse.total || 0);
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.toastr.error('Failed to load arcades', 'Error');
        this.isLoading.set(false);
      },
    });
  }

  onSearchChange(search: string): void {
    this.searchSubject.next(search);
  }

  filterByOnline(online: boolean | undefined): void {
    this.filters.update((f) => ({ ...f, online, page: 1 }));
  }

  clearFilters(): void {
    this.filters.set({
      page: 1,
      per_page: 9,
    });
  }

  goToArcadeDetail(arcadeId: number): void {
    this.router.navigate(['/arcades', arcadeId]);
  }

  previousPage(): void {
    const current = this.filters().page;
    if (current > 1) {
      this.filters.update((f) => ({ ...f, page: current - 1 }));
    }
  }

  nextPage(): void {
    const current = this.filters().page;
    if (current < this.totalPages()) {
      this.filters.update((f) => ({ ...f, page: current + 1 }));
    }
  }
}
