export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginRequest {
  user: {
    email: string;
    password: string;
  };
}

export interface SignupRequest {
  user: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  };
}

export interface AuthResponse {
  id: number;
  name: string;
  email: string;
  token: string;
}
