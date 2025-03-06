import { createAction, props } from '@ngrx/store';

export const initializeAuth = createAction('Initialize Auth State');
export const initializeAuthSuccess = createAction(
  'Initialize Auth Success',
  props<{ token: string; email: string }>()
);

export const login = createAction(
  'Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  'Login Success',
  props<{ token: string; email: string }>()
);

export const loginFailure = createAction(
  'Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('Logout'); 