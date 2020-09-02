import { TestBed } from '@angular/core/testing';

import { ArmazenamentoService } from './armazenamento.service';

describe('ArmazenamentoService', () => {
  let service: ArmazenamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmazenamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
