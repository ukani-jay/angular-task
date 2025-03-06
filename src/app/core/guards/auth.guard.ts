import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<any>,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(state => state.auth.token).pipe(
      take(1),
      map(token => {
        if (token) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
} 