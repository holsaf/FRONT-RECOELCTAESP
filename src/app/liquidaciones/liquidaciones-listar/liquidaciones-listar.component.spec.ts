import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidacionesListarComponent } from './liquidaciones-listar.component';

describe('LiquidacionesListarComponent', () => {
  let component: LiquidacionesListarComponent;
  let fixture: ComponentFixture<LiquidacionesListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquidacionesListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidacionesListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
