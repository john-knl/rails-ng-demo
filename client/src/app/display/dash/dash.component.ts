import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  DoCheck,
  Input,
} from '@angular/core';
import { iif, interval, Observable, Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Grid } from '../../shared/models/grid.model';
import { Layout } from '../../shared/models/layout.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/state';
import { LayoutSelectors } from '../../shared/state/display-state';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
})
export class DashComponent implements OnInit, OnDestroy, DoCheck {
  layout: Layout;
  @Input() layout$: Observable<Layout>;
  grids$: Observable<Grid[]>;
  index$: Observable<number>;
  private timer: Subscription;
  private selector: Subscription;
  private query: Subscription;
  index: number;
  id: number;

  constructor(
    private store: Store<AppState>,
    private titleService: Title,
    private elementRef: ElementRef,
    private route: ActivatedRoute
  ) {
    this.titleService.setTitle('Dashboard');
  }

  getData(): void {
    if (this.layout && this.layout.background) {
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.layout.background;
    }
  }

  setCycle(): void {
    if (this.layout && this.layout.duration > 0 && this.layout.grids) {
      const source = iif(
        () => this.layout.duration > 0,
        interval(this.layout.duration)
      );
      this.timer = source.subscribe(
        () => (this.index = (this.index + 1) % this.layout.grids.length)
      );
    }
  }

  setLayout(data: Layout): void {
    this.layout = data;
  }
  setIndex(index: number): void {
    this.index = index;
  }

  ngDoCheck(): void {
    if (this.timer) {
      this.timer.unsubscribe();
      this.getData();
      this.setCycle();
    }
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      if (data['resolver']) {
        this.layout = data['resolver'];
        this.getData();
        this.setCycle();
      }
    });

    this.layout$ = this.store.select(LayoutSelectors.selectLayout).pipe(
      filter((data): data is Layout => !!data)
    );
    this.selector = this.layout$.subscribe((data) => {
      this.setLayout(data);
      this.getData();
      this.setCycle();
    });
    this.index$ = this.store.select(LayoutSelectors.getIndex);
    this.query = this.index$.subscribe((index) => this.setIndex(index));
    this.grids$ = this.store.select(LayoutSelectors.getSubGrids);
  }

  ngOnDestroy(): void {
    if (this.selector) this.selector.unsubscribe();
    if (this.timer) this.timer.unsubscribe();
    if (this.query) this.query.unsubscribe();
  }
}
