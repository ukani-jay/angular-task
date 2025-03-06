import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from './auth.types';

export const initialState: AuthState = {
  token: null,
  userEmail: null,
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.initializeAuth, (state) => ({
    ...state,
    error: null // Clear any existing errors on initialization
  })),
  on(AuthActions.initializeAuthSuccess, (state, { token, email }) => ({
    ...state,
    token,
    userEmail: email,
    loading: false,
    error: null
  })),
  on(AuthActions.login, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { token, email }) => ({
    ...state,
    token,
    userEmail: email,
    loading: false,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(AuthActions.logout, () => initialState)
); 