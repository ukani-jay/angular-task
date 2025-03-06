import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ListComponent } from './features/list/list.component';
import { authReducer } from './store/auth/auth.reducer';
import { listReducer } from './store/list/list.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { ListEffects } from './store/list/list.effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      auth: authReducer,
      list: listReducer
    }),
    EffectsModule.forRoot([AuthEffects, ListEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false
    }),
    ReactiveFormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
