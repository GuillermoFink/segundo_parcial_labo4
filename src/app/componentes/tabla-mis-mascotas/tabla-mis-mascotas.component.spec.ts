import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMisMascotasComponent } from './tabla-mis-mascotas.component';

describe('TablaMisMascotasComponent', () => {
  let component: TablaMisMascotasComponent;
  let fixture: ComponentFixture<TablaMisMascotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaMisMascotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaMisMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
