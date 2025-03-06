import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  initializeAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initializeAuth),
      map(() => {
        const token = this.authService.getAuthToken();
        const email = this.authService.getUserEmail();
        
        if (token && email) {
          return AuthActions.initializeAuthSuccess({ token, email });
        }
        return { type: '[Auth] Initialize Auth No Token' };
      })
    )
  );

  initializeAuthSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initializeAuthSuccess),
      tap(() => {
        const currentUrl = window.location.pathname;
        if (currentUrl === '/login') {
          this.router.navigate(['/dashboard']);
        }
      })
    ),
    { dispatch: false }
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(response => AuthActions.loginSuccess({
            token: response.token,
            email: response.user.email
          })),
          catchError(error => of(AuthActions.loginFailure({ 
            error: 'Invalid credentials. Please try again.' 
          })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => this.router.navigate(['/dashboard']))
    ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.authService.logout();
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
} 