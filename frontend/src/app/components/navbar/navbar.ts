import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  Home,
  User,
  LogOut,
  Menu,
  X,
  Gamepad2,
  Moon,
  Sun,
} from 'lucide-angular';
import { Auth } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private router = inject(Router);
  private toastr = inject(ToastrService);

  authService = inject(Auth);
  themeService = inject(ThemeService);

  readonly Home = Home;
  readonly User = User;
  readonly LogOut = LogOut;
  readonly Menu = Menu;
  readonly X = X;
  readonly Gamepad2 = Gamepad2;
  readonly Moon = Moon;
  readonly Sun = Sun;

  isMobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.toastr.info('Logged out successfully', 'Goodbye!');
    this.router.navigate(['/login']);
    this.isMobileMenuOpen = false;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
