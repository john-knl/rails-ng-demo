import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { ActivatedRouteSnapshot } from '@angular/router';

import { LayoutResolver } from './layout.resolver';
import { AppState } from './shared/state';
import { Layout } from './shared/models/layout.model';
import { LayoutSelectors } from './shared/state/display-state';

describe('LayoutResolver', () => {
  let resolver: LayoutResolver;
  let store: MockStore<AppState>;

  const mockLayout: Layout = {
    id: 1, grids: [{}] as any, background: '#fff',
    duration: 0, kind: 'layout', name: 'Test Layout'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: provideMockStore({}),
    });
    store = TestBed.inject(MockStore);
    resolver = TestBed.inject(LayoutResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve', (done) => {
    // Mock selector to emit the mockLayout
    store.overrideSelector(LayoutSelectors.selectLayout, mockLayout);

    // Create a mock ActivatedRouteSnapshot with paramMap
    const route: any = {
      paramMap: {
        get: (key: string) => '1'
      }
    } as ActivatedRouteSnapshot;

    resolver.resolve(route).subscribe((layout) => {
      expect(layout).toEqual(mockLayout);
      done();
    });
  });
});
