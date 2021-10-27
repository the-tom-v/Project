import { TestBed } from '@angular/core/testing';

import { FacadeLoggedInService } from './facade-logged-in.service';

describe('FacadeLoggedInService', () => {
  let service: FacadeLoggedInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacadeLoggedInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
