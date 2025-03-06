import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ListActions from '../../store/list/list.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  items$ = this.store.select(state => state.list.items);
  loading$ = this.store.select(state => state.list.loading);
  error$ = this.store.select(state => state.list.error);

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(ListActions.loadItems());
  }
} 