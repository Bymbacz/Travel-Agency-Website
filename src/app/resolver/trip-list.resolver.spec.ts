import { TestBed } from '@angular/core/testing';

import { TripListResolver } from './trip-list.resolver';

describe('TripListResolver', () => {
  let resolver: TripListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TripListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
