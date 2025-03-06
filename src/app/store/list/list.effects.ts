import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { MockApiService } from 'src/app/core/services/mock-api.service';
import * as ListActions from './list.actions';

@Injectable()
export class ListEffects {
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListActions.loadItems),
      switchMap(() =>
        this.mockApi.getItems().pipe(
          map(items => ListActions.loadItemsSuccess({ items })),
          catchError(error => of(ListActions.loadItemsFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private mockApi: MockApiService
  ) {}
} 