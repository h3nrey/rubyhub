import {
  Component,
  inject,
  signal,
  ChangeDetectionStrategy,
  effect,
  untracked,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GameService, GameFilterRequest } from '../../services/game.service';
import { ArcadeService } from '../../services/arcade.service';
import { Game } from '../../models/game.models';
import { Arcade } from '../../models/arcade.models';
import { PaginationResponse } from '../../models/common.models';
import { LucideAngularModule, ArrowLeft, Search, Filter, Gamepad2, X } from 'lucide-angular';
import { ToastrService } from 'ngx-toastr';
import { GamesListCardComponent } from '../../components/games-list-card/games-list-card.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { FilterBadgeComponent } from '../../components/filter-badge/filter-badge.component';
import { ResultsCountComponent } from '../../components/results-count/results-count.component';
import { SelectFilterComponent } from '../../components/select-filter/select-filter.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ActiveFiltersComponent } from '../../components/active-filters/active-filters.component';
import { FilterSectionComponent } from '../../components/filter-section/filter-section.component';
import { debounceTime, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-arcade-games',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    RouterLink,
    GamesListCardComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    PageHeaderComponent,
    BackButtonComponent,
    FilterBadgeComponent,
    ResultsCountComponent,
    SelectFilterComponent,
    SearchInputComponent,
    ActiveFiltersComponent,
    FilterSectionComponent,
  ],
  templateUrl: './arcade-games.html',
  styleUrl: './arcade-games.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArcadeGames {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private gameService = inject(GameService);
  private arcadeService = inject(ArcadeService);

  readonly ArrowLeft = ArrowLeft;
  readonly Search = Search;
  readonly Filter = Filter;
  readonly Gamepad2 = Gamepad2;
  readonly X = X;

  arcade = signal<Arcade | null>(null);
  games = signal<Game[]>([]);
  totalGames = signal<number>(0);
  isLoading = signal(false);
  arcadeId = signal<number | null>(null);

  // Filters
  searchTerm = signal<string>('');
  selectedGenre = signal<string>('');
  selectedDeveloper = signal<string>('');
  showFilters = signal<boolean>(false);

  // Available filter options (loaded from all games without filters)
  availableGenres = signal<string[]>([]);
  availableDevelopers = signal<string[]>([]);

  private searchSubject = new Subject<string>();
  private filterSubject = new Subject<void>();

  constructor() {
    // Debounce search input
    this.searchSubject.pipe(debounceTime(300), takeUntilDestroyed()).subscribe((term) => {
      this.searchTerm.set(term);
      this.filterSubject.next();
    });

    // React to filter changes
    this.filterSubject.pipe(debounceTime(100), takeUntilDestroyed()).subscribe(() => {
      const arcadeId = this.arcadeId();
      if (arcadeId) {
        this.loadGames(arcadeId);
      }
    });

    effect(() => {
      const arcadeId = this.route.snapshot.paramMap.get('id');

      if (arcadeId) {
        this.arcadeId.set(Number(arcadeId));

        untracked(() => {
          this.loadArcade(Number(arcadeId));
          this.loadGames(Number(arcadeId));
          this.loadFilterOptions(Number(arcadeId));
        });
      }
    });
  }

  private loadArcade(arcadeId: number): void {
    this.arcadeService.getById(arcadeId).subscribe({
      next: (arcade) => {
        this.arcade.set(arcade);
      },
      error: (error) => {
        console.error('Error loading arcade:', error);
        this.toastr.error('Error loading arcade');
      },
    });
  }

  private loadGames(arcadeId: number): void {
    this.isLoading.set(true);

    const filters: Partial<GameFilterRequest> = {};

    const search = this.searchTerm();
    if (search) {
      filters.search = search;
    }

    const genre = this.selectedGenre();
    if (genre) {
      filters.genre = genre;
    }

    const developer = this.selectedDeveloper();
    if (developer) {
      filters.developer = developer;
    }

    this.gameService.getByArcadeId(arcadeId, filters).subscribe({
      next: (response) => {
        const games = Array.isArray(response) ? response : response.data || [];
        const total = Array.isArray(response) ? response.length : response.total || 0;

        this.games.set(games);
        this.totalGames.set(total);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading games:', error);
        this.toastr.error('Error loading games');
        this.isLoading.set(false);
      },
    });
  }

  private loadFilterOptions(arcadeId: number): void {
    // Load filter options from dedicated endpoint
    this.gameService.getFilterOptions(arcadeId).subscribe({
      next: (options) => {
        this.availableGenres.set(options.genres);
        this.availableDevelopers.set(options.developers);
      },
      error: (error) => {
        console.error('Error loading filter options:', error);
      },
    });
  }

  onSearchInput(value: string): void {
    this.searchSubject.next(value);
  }

  onGenreChange(): void {
    this.filterSubject.next();
  }

  onDeveloperChange(): void {
    this.filterSubject.next();
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedGenre.set('');
    this.selectedDeveloper.set('');
    this.filterSubject.next();
  }

  toggleFilters(): void {
    this.showFilters.set(!this.showFilters());
  }

  goBack(): void {
    const arcadeId = this.arcadeId();
    if (arcadeId) {
      this.router.navigate(['/arcades', arcadeId]);
    } else {
      this.router.navigate(['/arcades']);
    }
  }
}
