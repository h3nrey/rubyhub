import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Trophy } from 'lucide-angular';

@Component({
  selector: 'app-arcade-ranking-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './arcade-ranking-section.component.html',
})
export class ArcadeRankingSectionComponent {
  readonly Trophy = Trophy;
}
