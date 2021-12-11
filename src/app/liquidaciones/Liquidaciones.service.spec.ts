/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LiquidacionesService } from './liquidaciones.service';

describe('Service: Liquidaciones', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiquidacionesService]
    });
  });

  it('should ...', inject([LiquidacionesService], (service: LiquidacionesService) => {
    expect(service).toBeTruthy();
  }));
});
