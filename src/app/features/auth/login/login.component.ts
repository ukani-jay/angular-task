import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import * as AuthActions from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  error$ = this.store.select(state => state.auth.error);
  loading$ = this.store.select(state => state.auth.loading);

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    if (this.cookieService.check('auth_token')) {
      this.router.navigate(['/dashboard']);
    }
  }

  get getField() { 
    return this.loginForm.controls; 
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.store.dispatch(AuthActions.login({ email, password }));
  }
} 