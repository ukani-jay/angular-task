import { createAction, props } from '@ngrx/store';
import { ListItem } from './list.types';

export const loadItems = createAction('List Load Items');
export const loadItemsSuccess = createAction(
  'List Load Items Success',
  props<{ items: ListItem[] }>()
);
export const loadItemsFailure = createAction(
  'List Load Items Failure',
  props<{ error: string }>()
); 