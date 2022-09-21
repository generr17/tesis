import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaUsoComponent } from './politica-uso.component';

describe('PoliticaUsoComponent', () => {
  let component: PoliticaUsoComponent;
  let fixture: ComponentFixture<PoliticaUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticaUsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticaUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
