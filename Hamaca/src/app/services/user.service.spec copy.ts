import { TestBed } from '@angular/core/testing';

import { CholloService } from './chollo.service';

describe('CholloService', () => {
  let service: CholloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CholloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
