import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Users } from 'lucide-angular';

@Component({
  selector: 'app-arcade-players-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './arcade-players-section.component.html',
})
export class ArcadePlayersSectionComponent {
  readonly Users = Users;
}
