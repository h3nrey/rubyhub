export interface Game {
  id: number;
  name: string;
  genre: string;
  developer: string;
  release_year: number;
  description: string;
  rating: number;
  cover_image?: string;
  arcade_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateGameRequest {
  name: string;
  genre: string;
  developer: string;
  release_year: number;
  description: string;
  rating?: number;
  cover_image?: string;
}

export interface UpdateGameRequest extends Partial<CreateGameRequest> {}
