export interface AuthState {
  token: string | null;
  userEmail: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginResponse {
  token: string;
  user: {
    email: string;
  };
} 