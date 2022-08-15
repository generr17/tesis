import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoSuscripcionComponent } from './pago-suscripcion.component';

describe('PagoSuscripcionComponent', () => {
  let component: PagoSuscripcionComponent;
  let fixture: ComponentFixture<PagoSuscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoSuscripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoSuscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
