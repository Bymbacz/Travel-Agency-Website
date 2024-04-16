import { TestBed } from '@angular/core/testing';

import { ReviewsResolver } from './reviews.resolver';

describe('ReviewsResolver', () => {
  let resolver: ReviewsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ReviewsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
