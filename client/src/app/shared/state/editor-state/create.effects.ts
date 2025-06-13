import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ConfigService } from '../../config.service';
import { GridActions, LayoutActions } from '../display-state';
import * as fromActions from './create.actions';

@Injectable()
export class CreateEffects {
  createLayout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createLayout),
      mergeMap((action) =>
        this.conf.createLayout(action.layout).pipe(
          map((layout) => fromActions.createLayoutSuccess({ layout: layout })),
          catchError(() => of(fromActions.createLayoutFail()))
        )
      )
    )
  );

  createLayoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.createLayoutSuccess),
        tap((res) =>
          this.router.navigate([
            '',
            { outlets: { drawer: ['layout', res.layout.id] } },
          ])
        )
      ),
    { dispatch: false }
  );

  createLayoutFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.createLayoutFail),
        tap(() =>
          this.snackbar.open('Failed to create layout', 'Error', {
            duration: 2500,
          })
        )
      ),
    { dispatch: false }
  );

  createGrid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createGrid),
      mergeMap((action) =>
        this.conf.createGrid(action.grid).pipe(
          map((grid) => fromActions.createGridSuccess({ grid: grid })),
          catchError(() => of(fromActions.createGridFail()))
        )
      )
    )
  );

  createGridSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.createGridSuccess),
        tap((res) =>
          this.router.navigate([
            '',
            { outlets: { drawer: ['grid', res.grid.id] } },
          ])
        )
      ),
    { dispatch: false }
  );

  createGridFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.createGridFail),
        tap(() =>
          this.snackbar.open('Failed to create grid', 'Error', {
            duration: 2500,
          })
        )
      ),
    { dispatch: false }
  );

  createWidget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createWidget),
      mergeMap((action) =>
        this.conf.createWidget(action.widget).pipe(
          map((widget) => fromActions.createWidgetSuccess({ widget: widget })),
          catchError(() => of(fromActions.createWidgetFail()))
        )
      )
    )
  );

  createWidgetSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.createWidgetSuccess),
        tap((res) =>
          this.router.navigate([
            '',
            { outlets: { drawer: ['widget', res.widget.id] } },
          ])
        )
      ),
    { dispatch: false }
  );

  createWidgetFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.createWidgetFail),
        tap(() =>
          this.snackbar.open('Failed to create widget', 'Error', {
            duration: 2500,
          })
        )
      ),
    { dispatch: false }
  );

  createLayoutGrid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createLayoutGrid),
      mergeMap((action) =>
        this.conf.createLayoutGrid(action.layoutgrid).pipe(
          map((layoutgrid) =>
            fromActions.createLayoutGridSuccess({ layoutgrid: layoutgrid })
          ),
          catchError(() => of(fromActions.createLayoutGridFail()))
        )
      )
    )
  );

  createLayoutGridSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createLayoutGridSuccess),
      map((action) =>
        LayoutActions.fetchLayout({ id: action.layoutgrid.layout_id })
      )
    )
  );

  createLayoutGridFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.createLayoutGridFail),
        tap(() =>
          this.snackbar.open('Failed to add grid', 'Error', {
            duration: 2500,
          })
        )
      ),
    { dispatch: false }
  );

  deleteLayoutGrid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deleteLayoutGrid),
      mergeMap((action) =>
        this.conf.deleteLayoutGrid(action.layoutgrid.id).pipe(
          map(() =>
            fromActions.deleteLayoutGridSuccess({
              layoutgrid: action.layoutgrid,
            })
          ),
          catchError((error) => of(fromActions.deleteLayoutGridFail(error)))
        )
      )
    )
  );

  deleteLayoutGridSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deleteLayoutGridSuccess),
      map((action) =>
        LayoutActions.fetchLayout({ id: action.layoutgrid.layout_id })
      )
    )
  );

  deleteLayoutGridFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.deleteLayoutGridFail),
        tap((error) =>
          this.snackbar.open(error.error.message, 'Error', {
            duration: 2500,
          })
        )
      ),
    { dispatch: false }
  );

  updateLayoutGrid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateLayoutGrid),
      mergeMap((action) =>
        this.conf.updateLayoutGrid(action.layoutgrid).pipe(
          map((layoutgrid) =>
            fromActions.updateLayoutGridSuccess({ layoutgrid: layoutgrid })
          ),
          catchError(() => of(fromActions.updateLayoutGridFail()))
        )
      )
    )
  );

  updateLayoutGridSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateLayoutGridSuccess),
      map((action) =>
        LayoutActions.fetchLayout({ id: action.layoutgrid.layout_id })
      )
    )
  );

  updateLayoutGridFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.updateLayoutGridFail),
        tap(() =>
          this.snackbar.open('Failed to move grid', 'Error', {
            duration: 2500,
          })
        )
      ),
    { dispatch: false }
  );

  createGridWidget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createGridWidget),
      mergeMap((action) =>
        this.conf.createGridWidget(action.gridwidget).pipe(
          map((gridwidget) =>
            fromActions.createGridWidgetSuccess({ gridwidget: gridwidget })
          ),
          catchError(() => of(fromActions.createLayoutGridFail()))
        )
      )
    )
  );

  createGridWidgetSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createGridWidgetSuccess),
      map((action) => GridActions.fetchGrid({ id: action.gridwidget.grid_id }))
    )
  );

  createGridWidgetFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.createGridWidgetFail),
        tap(() =>
          this.snackbar.open('Failed to add grid', 'Error', {
            duration: 2500,
          })
        )
      ),
    { dispatch: false }
  );

  deleteGridWidget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deleteGridWidget),
      mergeMap((action) =>
        this.conf.deleteGridWidget(action.gridwidget.id).pipe(
          map(() =>
            fromActions.deleteGridWidgetSuccess({
              gridwidget: action.gridwidget,
            })
          ),
          catchError((error) => of(fromActions.deleteGridWidgetFail(error)))
        )
      )
    )
  );

  deleteGridWidgetSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deleteGridWidgetSuccess),
      map((action) => GridActions.fetchGrid({ id: action.gridwidget.grid_id }))
    )
  );

  deleteGridWidgetFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.deleteGridWidgetFail),
        tap((error) =>
          this.snackbar.open(error.error.message, 'Error', {
            duration: 2500,
          })
        )
      ),
    { dispatch: false }
  );

  updateGridWidget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateGridWidget),
      mergeMap((action) =>
        this.conf.updateGridWidget(action.gridwidget).pipe(
          map((gridwidget) =>
            fromActions.updateGridWidgetSuccess({ gridwidget: gridwidget })
          ),
          catchError(() => of(fromActions.updateGridWidgetFail()))
        )
      )
    )
  );

  updateGridWidgetSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateGridWidgetSuccess),
      map((action) => GridActions.fetchGrid({ id: action.gridwidget.grid_id }))
    )
  );

  updateGridWidgetFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.updateGridWidgetFail),
        tap(() =>
          this.snackbar.open('Failed to move grid', 'Error', {
            duration: 2500,
          })
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private conf: ConfigService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}
}
