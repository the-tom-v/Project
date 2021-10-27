import { TestBed } from '@angular/core/testing';

import { LoggedInService } from './logged-in.service';

describe('LoggedInService', () => {
  let service: LoggedInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
