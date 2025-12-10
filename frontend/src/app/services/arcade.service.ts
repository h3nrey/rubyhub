import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Arcade, CreateArcadeRequest, UpdateArcadeRequest } from '../models/arcade.models';
import { BaseFilterRequest, PaginationResponse } from '../models/common.models';
import { environment } from '../../environments/environment';

export interface ArcadeFilterRequest extends BaseFilterRequest {
  online?: boolean;
  theme?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ArcadeService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/arcades`;

  getAll(filters?: ArcadeFilterRequest): Observable<Arcade[] | PaginationResponse<Arcade>> {
    const params = this.buildParams(filters);
    return this.http.get<Arcade[] | PaginationResponse<Arcade>>(this.apiUrl, { params });
  }

  private buildParams(filters?: ArcadeFilterRequest): HttpParams {
    if (!filters) return new HttpParams();

    let params = new HttpParams();

    if (filters.page !== undefined && filters.page !== null) {
      params = params.set('page', String(filters.page));
    }

    if (filters.per_page !== undefined && filters.per_page !== null) {
      params = params.set('per_page', String(filters.per_page));
    }

    if (filters.search !== undefined && filters.search !== null && filters.search !== '') {
      params = params.set('search', filters.search);
    }

    if (filters.online !== undefined && filters.online !== null) {
      params = params.set('online', String(filters.online));
    }

    if (filters.theme !== undefined && filters.theme !== null && filters.theme !== '') {
      params = params.set('theme', filters.theme);
    }

    return params;
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
