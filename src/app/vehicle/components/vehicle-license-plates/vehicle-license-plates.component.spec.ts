import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleLicensePlatesComponent } from './vehicle-license-plates.component';

describe('VehicleLicensePlatesComponent', () => {
  let component: VehicleLicensePlatesComponent;
  let fixture: ComponentFixture<VehicleLicensePlatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleLicensePlatesComponent]
    });
    fixture = TestBed.createComponent(VehicleLicensePlatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
