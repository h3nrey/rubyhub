import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Gamepad2 } from 'lucide-angular';

@Component({
  selector: 'app-arcade-matches-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './arcade-matches-section.component.html',
})
export class ArcadeMatchesSectionComponent {
  readonly Gamepad2 = Gamepad2;
}
