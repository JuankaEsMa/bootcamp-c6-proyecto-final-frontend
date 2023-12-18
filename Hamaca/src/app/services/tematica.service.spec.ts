import { TestBed } from '@angular/core/testing';

import { TematicaService } from './tematica.service';

describe('TematicaService', () => {
  let service: TematicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TematicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
