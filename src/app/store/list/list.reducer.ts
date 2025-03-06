import { createReducer, on } from '@ngrx/store';
import * as ListActions from './list.actions';

export interface ListState {
  items: any[];
  loading: boolean;
  error: string | null;
}

export const initialState: ListState = {
  items: [],
  loading: false,
  error: null
};

export const listReducer = createReducer(
  initialState,
  on(ListActions.loadItems, state => ({ ...state, loading: true })),
  on(ListActions.loadItemsSuccess, (state, { items }) => ({ 
    ...state, 
    items,
    loading: false 
  })),
  on(ListActions.loadItemsFailure, (state, { error }) => ({ 
    ...state, 
    error,
    loading: false 
  }))
); 