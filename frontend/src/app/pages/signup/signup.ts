import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';
import { LucideAngularModule, UserPlus } from 'lucide-angular';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LucideAngularModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  readonly UserPlus = UserPlus;
  signupForm: FormGroup;
  isLoading = false;

  constructor() {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.signupForm.valid && !this.isLoading) {
      this.isLoading = true;
      const { name, email, password } = this.signupForm.value;

      this.authService.signup(name, email, password).subscribe({
        next: (response) => {
          this.toastr.success('Account created successfully!', 'Welcome!');
          this.router.navigate(['/']);
          this.isLoading = false;
        },
        error: (error) => {
          const errorMsg = error.error?.errors?.join(', ') || 'Could not create account';
          this.toastr.error(errorMsg, 'Signup failed');
          this.isLoading = false;
        },
      });
    }
  }
}
