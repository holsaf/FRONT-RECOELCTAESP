/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehiculosAdminService } from './vehiculosAdmin.service';

describe('Service: VehiculosAdmin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehiculosAdminService]
    });
  });

  it('should ...', inject([VehiculosAdminService], (service: VehiculosAdminService) => {
    expect(service).toBeTruthy();
  }));
});
