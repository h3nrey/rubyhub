import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { LucideAngularModule, Gamepad2 } from 'lucide-angular';

@Component({
  selector: 'app-home',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private authService = inject(Auth);
  private router = inject(Router);

  readonly Gamepad2 = Gamepad2;
  currentUser$ = this.authService.currentUser$;

  ngOnInit() {
    // Redirect to login if not authenticated
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }
}
