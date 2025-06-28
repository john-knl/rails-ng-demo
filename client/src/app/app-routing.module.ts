import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashComponent } from './display/dash/dash.component';
import { EditorWidgetComponent } from './editor/editor-widget/editor-widget.component';
import { EditorGridComponent } from './editor/editor-grid/editor-grid.component';
import { EditorLayoutComponent } from './editor/editor-layout/editor-layout.component';
import { NewWidgetComponent } from './editor/new-widget/new-widget.component';
import { EditWidgetComponent } from './editor/edit-widget/edit-widget.component';
import { NewGridComponent } from './editor/new-grid/new-grid.component';
import { EditGridComponent } from './editor/edit-grid/edit-grid.component';
import { NewLayoutComponent } from './editor/new-layout/new-layout.component';
import { EditLayoutComponent } from './editor/edit-layout/edit-layout.component';
import { HomeComponent } from './display/home/home.component';
import { LayoutResolver } from './layout.resolver';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dash/:id', component: DashComponent, resolve: { resolver: LayoutResolver } },
  { path: 'widgets', component: EditorWidgetComponent, outlet: 'drawer' },
  { path: 'new_widget', component: NewWidgetComponent, outlet: 'drawer' },
  { path: 'widget/:id', component: EditWidgetComponent, runGuardsAndResolvers: 'always', outlet: 'drawer' },
  { path: 'grids', component: EditorGridComponent, outlet: 'drawer' },
  { path: 'new_grid', component: NewGridComponent, outlet: 'drawer' },
  { path: 'grid/:id', component: EditGridComponent, runGuardsAndResolvers: 'always', outlet: 'drawer' },
  { path: 'layouts', component: EditorLayoutComponent, outlet: 'drawer' },
  { path: 'new_layout', component: NewLayoutComponent, outlet: 'drawer' },
  { path: 'layout/:id', component: EditLayoutComponent, resolve: { resolver: LayoutResolver }, runGuardsAndResolvers: 'always', outlet: 'drawer' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      onSameUrlNavigation: 'reload',
    }),
    CommonModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
