export interface Arcade {
  id: number;
  name: string;
  theme: string;
  description: string;
  online: boolean;
  owner_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateArcadeRequest {
  arcade: {
    name: string;
    theme: string;
    description: string;
    online: boolean;
  };
}

export interface UpdateArcadeRequest {
  arcade: {
    name?: string;
    theme?: string;
    description?: string;
    online?: boolean;
  };
}
