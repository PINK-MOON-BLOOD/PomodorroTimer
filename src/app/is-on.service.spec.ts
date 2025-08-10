import { TestBed } from '@angular/core/testing';

import { IsOnService } from './is-on.service';

describe('IsOnService', () => {
  let service: IsOnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsOnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
