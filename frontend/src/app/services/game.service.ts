import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game, CreateGameRequest, UpdateGameRequest } from '../models/game.models';
import { BaseFilterRequest, PaginationResponse } from '../models/common.models';
import { environment } from '../../environments/environment';

export interface GameFilterRequest extends BaseFilterRequest {
  genre?: string;
  developer?: string;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}`;

  getByArcadeId(
    arcadeId: number,
    filters?: GameFilterRequest
  ): Observable<Game[] | PaginationResponse<Game>> {
    const url = `${this.apiUrl}/arcades/${arcadeId}/games`;
    const params = this.buildParams(filters);
    return this.http.get<Game[] | PaginationResponse<Game>>(url, { params });
  }

  private buildParams(filters?: GameFilterRequest): HttpParams {
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

    if (filters.genre !== undefined && filters.genre !== null && filters.genre !== '') {
      params = params.set('genre', filters.genre);
    }

    if (filters.developer !== undefined && filters.developer !== null && filters.developer !== '') {
      params = params.set('developer', filters.developer);
    }

    return params;
  }

  create(arcadeId: number, request: CreateGameRequest): Observable<Game> {
    return this.http.post<Game>(`${this.apiUrl}/arcades/${arcadeId}/games`, request);
  }

  update(arcadeId: number, gameId: number, request: UpdateGameRequest): Observable<Game> {
    return this.http.put<Game>(`${this.apiUrl}/arcades/${arcadeId}/games/${gameId}`, request);
  }

  delete(arcadeId: number, gameId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/arcades/${arcadeId}/games/${gameId}`);
  }
}
