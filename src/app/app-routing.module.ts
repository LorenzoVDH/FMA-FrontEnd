import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartpageComponent } from './startpage/startpage.component';
import { DriverOverviewComponent } from './driver/components/driver-overview/driver-overview.component';
import { DriverEditComponent } from './driver/components/driver-edit/driver-edit.component';
import { DriverComponent } from './driver/driver.component';
import { DriverAddComponent } from './driver/components/driver-add/driver-add.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleReportsComponent } from './vehicle/components/vehicle-reports/vehicle-reports.component';
import { VehicleEditComponent } from './vehicle/components/vehicle-edit/vehicle-edit.component';
import { VehicleAddComponent } from './vehicle/components/vehicle-add/vehicle-add.component';
import { SigninRedirectCallbackComponent } from './core/components/signin-redirect-callback/signin-redirect-callback.component';
import { VehicleLicensePlatesComponent } from './vehicle/components/vehicle-license-plates/vehicle-license-plates.component';
import { VehicleMaintenancesComponent } from './vehicle/components/vehicle-maintenances/vehicle-maintenances.component';
import { InquiryComponent } from './inquiry/inquiry.component';

 const routes: Routes = [
   { path: '', redirectTo: '/startpage', pathMatch: 'full' },
   { path: 'startpage', component: StartpageComponent },
   { path: 'drivers', component: DriverComponent },
   { path: 'drivers/overview', component: DriverOverviewComponent },
   { path: 'drivers/edit/:driverId', component: DriverEditComponent },
   { path: 'drivers/add', component: DriverAddComponent },
   { path: 'vehicles', component: VehicleComponent },
   { path: 'vehicles/reports/:vehicleId', component: VehicleReportsComponent},
   { path: 'vehicles/add', component: VehicleAddComponent},
   { path: 'vehicles/edit/:vehicleId', redirectTo: 'vehicles/:vehicleId', pathMatch: 'full'},
   { path: 'vehicles/:vehicleId', component: VehicleEditComponent},
   { path: 'vehicles/:vehicleId/licenseplates', component: VehicleLicensePlatesComponent},
   { path: 'vehicles/:vehicleId/maintenances', component: VehicleMaintenancesComponent},
   { path: 'signin-callback', component: SigninRedirectCallbackComponent },
   { path: 'inquiries', component: InquiryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

