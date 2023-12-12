import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleMaintenancesComponent } from './vehicle-maintenances.component';

describe('VehicleMaintenancesComponent', () => {
  let component: VehicleMaintenancesComponent;
  let fixture: ComponentFixture<VehicleMaintenancesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleMaintenancesComponent]
    });
    fixture = TestBed.createComponent(VehicleMaintenancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
