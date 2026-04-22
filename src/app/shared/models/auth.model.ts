export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  acessToken: string;
  refreshToken: string;
  name: string;
  email: string;
}

export interface RefreshTokenResponse {
  refreshToken: string;
}
