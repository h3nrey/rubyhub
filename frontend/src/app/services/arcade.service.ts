import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Arcade, CreateArcadeRequest, UpdateArcadeRequest } from '../models/arcade.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArcadeService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/arcades`;

  getAll(filters?: { online?: boolean; theme?: string }): Observable<Arcade[]> {
    let params = new HttpParams();

    if (filters?.online !== undefined) {
      params = params.set('online', filters.online.toString());
    }

    if (filters?.theme) {
      params = params.set('theme', filters.theme);
    }

    return this.http.get<Arcade[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Arcade> {
    return this.http.get<Arcade>(`${this.apiUrl}/${id}`);
  }

  create(request: CreateArcadeRequest): Observable<Arcade> {
    return this.http.post<Arcade>(this.apiUrl, request);
  }

  update(id: number, request: UpdateArcadeRequest): Observable<Arcade> {
    return this.http.put<Arcade>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
