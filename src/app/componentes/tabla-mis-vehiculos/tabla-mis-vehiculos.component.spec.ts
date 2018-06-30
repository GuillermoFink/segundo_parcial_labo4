import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMisVehiculosComponent } from './tabla-mis-vehiculos.component';

describe('TablaMisVehiculosComponent', () => {
  let component: TablaMisVehiculosComponent;
  let fixture: ComponentFixture<TablaMisVehiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaMisVehiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaMisVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
