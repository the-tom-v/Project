import { TestBed } from '@angular/core/testing';

import { LoggedInSharedService } from './logged-in-shared.service';

describe('LoggedInSharedService', () => {
  let service: LoggedInSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedInSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
