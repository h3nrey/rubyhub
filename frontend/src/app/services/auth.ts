import { Injectable, inject, afterNextRender } from '@angular/core';
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

  constructor() {
    // Load user from localStorage only on client side
    afterNextRender(() => {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUserSubject.next(JSON.parse(storedUser));
      }
    });
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const request: LoginRequest = {
      user: { email, password },
    };

    return this.http.post<AuthResponse>(`${this.apiUrl}/users`, request).pipe(
      tap((response) => {
        const user: User = {
          id: response.id,
          name: response.name,
          email: response.email,
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
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

    return this.http.post<AuthResponse>(`${this.apiUrl}/users`, request).pipe(
      tap((response) => {
        const user: User = {
          id: response.id,
          name: response.name,
          email: response.email,
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}
