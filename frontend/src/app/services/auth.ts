import { Injectable, inject, afterNextRender, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { LoginRequest, SignupRequest, AuthResponse, User } from '../models/auth.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private tokenSignal = signal<string | null>(null);

  constructor() {
    // Load user and token from localStorage only on client side
    afterNextRender(() => {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUserSubject.next(JSON.parse(storedUser));
      }
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        this.tokenSignal.set(storedToken);
      }
    });
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const request: LoginRequest = {
      user: { email, password },
    };

    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, request).pipe(
      tap((response) => {
        const user: User = {
          id: response.id,
          name: response.name,
          email: response.email,
        };
        afterNextRender(() => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', response.token);
          this.tokenSignal.set(response.token);
          this.currentUserSubject.next(user);
        });
      })
    );
  }

  signup(name: string, email: string, password: string): Observable<AuthResponse> {
    const request: SignupRequest = {
      user: {
        name,
        email,
        password,
        password_confirmation: password,
      },
    };

    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/signup`, request).pipe(
      tap((response) => {
        const user: User = {
          id: response.id,
          name: response.name,
          email: response.email,
        };
        afterNextRender(() => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', response.token);
          this.tokenSignal.set(response.token);
          this.currentUserSubject.next(user);
        });
      })
    );
  }

  logout(): void {
    afterNextRender(() => {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      this.tokenSignal.set(null);
      this.currentUserSubject.next(null);
    });
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}
