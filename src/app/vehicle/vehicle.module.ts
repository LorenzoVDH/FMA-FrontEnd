import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router'; 

import { VehicleComponent } from './vehicle.component';
import { VehicleOverviewComponent } from './components/vehicle-overview/vehicle-overview.component'; 
import { VehicleReportsComponent } from './components/vehicle-reports/vehicle-reports.component';
import { VehicleEditComponent } from './components/vehicle-edit/vehicle-edit.component';
import { VehicleAddComponent } from './components/vehicle-add/vehicle-add.component';
import { VehicleLicensePlatesComponent } from './components/vehicle-license-plates/vehicle-license-plates.component';
import { VehicleMaintenancesComponent } from './components/vehicle-maintenances/vehicle-maintenances.component';

@NgModule({
  declarations: [
    VehicleComponent,
    VehicleOverviewComponent,
    VehicleReportsComponent,
    VehicleEditComponent,
    VehicleAddComponent,
    VehicleLicensePlatesComponent,
    VehicleMaintenancesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule
  ]
})
export class VehicleModule { }
