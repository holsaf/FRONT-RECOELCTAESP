import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecolectaComponent } from './recolecta.component';

describe('RecolectaComponent', () => {
  let component: RecolectaComponent;
  let fixture: ComponentFixture<RecolectaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecolectaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecolectaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
