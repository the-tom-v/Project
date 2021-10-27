import { TestBed } from '@angular/core/testing';

import { FacadeDashboardService } from './facade-dashboard.service';

describe('FacadeDashboardService', () => {
  let service: FacadeDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacadeDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
