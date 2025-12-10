import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  previousPage = output<void>();
  nextPage = output<void>();

  onPreviousClick(): void {
    if (this.currentPage() > 1) {
      this.previousPage.emit();
    }
  }

  onNextClick(): void {
    if (this.currentPage() < this.totalPages()) {
      this.nextPage.emit();
    }
  }
}
