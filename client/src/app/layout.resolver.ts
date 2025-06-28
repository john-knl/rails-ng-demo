import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { Layout } from './shared/models/layout.model';
import { AppState } from './shared/state';
import { LayoutActions, LayoutSelectors } from './shared/state/display-state';

@Injectable({
  providedIn: 'root',
})
export class LayoutResolver implements Resolve<Layout> {
  constructor(private store: Store<AppState>) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Layout> {
    const id = Number(route.paramMap.get('id'));
    this.store.dispatch(LayoutActions.fetchLayout({ id }));

    return this.store.pipe(
      select(LayoutSelectors.selectLayout),
      filter((layout: Layout) => !!layout && layout.id === id && !!layout.grids),
      first()
    );
  }
}
