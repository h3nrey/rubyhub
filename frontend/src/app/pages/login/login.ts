import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';
import { LucideAngularModule, LogIn } from 'lucide-angular';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LucideAngularModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  readonly LogIn = LogIn;
  loginForm: FormGroup;
  isLoading = false;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.toastr.success('Login successful!', 'Welcome back!');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.isLoading = false;
          this.toastr.error('Invalid credentials', 'Login failed');
        },
      });
    }
  }
}
