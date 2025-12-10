import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Wifi, WifiOff } from 'lucide-angular';
import { Arcade } from '../../models/arcade.models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-arcade-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './arcade-card.component.html',
  styleUrl: './arcade-card.component.scss',
})
export class ArcadeCardComponent {
  readonly Wifi = Wifi;
  readonly WifiOff = WifiOff;

  arcade = input.required<Arcade>();
}
