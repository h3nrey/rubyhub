import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Arcade, CreateArcadeRequest, UpdateArcadeRequest } from '../models/arcade.models';
import { BaseFilterRequest, PaginationResponse } from '../models/common.models';
import { environment } from '../../environments/environment';

/**
 * Arcade-specific filter request
 * Extends BaseFilterRequest with arcade-specific filters
 */
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

  /**
   * Get all arcades with optional filters
   * @param filters - Filter criteria for arcades
   * @returns Observable of arcade data or paginated response
   */
  getAll(filters?: ArcadeFilterRequest): Observable<Arcade[] | PaginationResponse<Arcade>> {
    let params = new HttpParams();

    if (filters) {
      // Pagination parameters
      if (filters.page !== undefined) {
        params = params.set('page', filters.page.toString());
      }

      if (filters.per_page !== undefined) {
        params = params.set('per_page', filters.per_page.toString());
      }

      // Search parameter
      if (filters.search) {
        params = params.set('search', filters.search);
      }

      // Status filter
      if (filters.online !== undefined) {
        params = params.set('online', filters.online.toString());
      }

      // Theme filter
      if (filters.theme) {
        params = params.set('theme', filters.theme);
      }
    }

    return this.http.get<Arcade[] | PaginationResponse<Arcade>>(this.apiUrl, { params });
  }

  /**
   * Get arcade by ID
   * @param id - Arcade ID
   * @returns Observable of arcade data
   */
  getById(id: number): Observable<Arcade> {
    return this.http.get<Arcade>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create new arcade
   * @param request - Create arcade request
   * @returns Observable of created arcade
   */
  create(request: CreateArcadeRequest): Observable<Arcade> {
    return this.http.post<Arcade>(this.apiUrl, request);
  }

  /**
   * Update arcade
   * @param id - Arcade ID
   * @param request - Update arcade request
   * @returns Observable of updated arcade
   */
  update(id: number, request: UpdateArcadeRequest): Observable<Arcade> {
    return this.http.put<Arcade>(`${this.apiUrl}/${id}`, request);
  }

  /**
   * Delete arcade
   * @param id - Arcade ID
   * @returns Observable of void
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
