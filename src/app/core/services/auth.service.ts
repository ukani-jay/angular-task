import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MockApiService } from './mock-api.service';

export interface LoginResponse {
  token: string;
  user: {
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_COOKIE = 'auth_token';
  private readonly USER_COOKIE = 'user_email';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private mockApi: MockApiService
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.mockApi.login(email, password).pipe(
      tap(response => {
        this.cookieService.set(this.AUTH_COOKIE, response.token);
        this.cookieService.set(this.USER_COOKIE, response.user.email);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  logout(): void {
    this.cookieService.delete(this.AUTH_COOKIE);
    this.cookieService.delete(this.USER_COOKIE);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.cookieService.check(this.AUTH_COOKIE);
  }

  getAuthToken(): string {
    return this.cookieService.get(this.AUTH_COOKIE);
  }

  getUserEmail(): string {
    return this.cookieService.get(this.USER_COOKIE);
  }

  getAuthStatus(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
} 