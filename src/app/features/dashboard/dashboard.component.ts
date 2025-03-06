import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  userEmail$ = this.store.select(state => state.auth.userEmail);

  constructor(
    private store: Store<any>,
    private router: Router
  ) {}

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  navigateToList() {
    this.router.navigate(['/list']);
  }
} 