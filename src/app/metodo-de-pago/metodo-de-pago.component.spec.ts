import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoDePagoComponent } from './metodo-de-pago.component';

describe('MetodoDePagoComponent', () => {
  let component: MetodoDePagoComponent;
  let fixture: ComponentFixture<MetodoDePagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetodoDePagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodoDePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
