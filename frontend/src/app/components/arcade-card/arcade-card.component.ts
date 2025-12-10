import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Wifi, WifiOff } from 'lucide-angular';
import { Arcade } from '../../models/arcade.models';

@Component({
  selector: 'app-arcade-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './arcade-card.component.html',
  styleUrl: './arcade-card.component.scss',
})
export class ArcadeCardComponent {
  readonly Wifi = Wifi;
  readonly WifiOff = WifiOff;

  arcade = input.required<Arcade>();
  cardClick = output<number>();

  onClick(): void {
    this.cardClick.emit(this.arcade().id);
  }
}
