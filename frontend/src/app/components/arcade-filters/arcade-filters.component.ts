import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Filter, Wifi, WifiOff } from 'lucide-angular';

export interface FilterState {
  online: boolean | undefined;
  theme: string;
  search: string;
}

@Component({
  selector: 'app-arcade-filters',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './arcade-filters.component.html',
  styleUrl: './arcade-filters.component.scss',
})
export class ArcadeFiltersComponent {
  readonly Filter = Filter;
  readonly Wifi = Wifi;
  readonly WifiOff = WifiOff;

  filters = input.required<FilterState>();
  onlineFilterChange = output<boolean | undefined>();
  clearFilters = output<void>();

  onOnlineFilterClick(online: boolean | undefined): void {
    this.onlineFilterChange.emit(online);
  }

  onClearFiltersClick(): void {
    this.clearFilters.emit();
  }
}
