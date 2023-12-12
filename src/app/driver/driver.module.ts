import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router'; 

import { DriverComponent } from './driver.component';
import { DriverEditComponent } from './components/driver-edit/driver-edit.component';
import { DriverOverviewComponent } from './components/driver-overview/driver-overview.component';

import { DriverService } from '../core/services/driver.service';
import { DriverAddComponent } from './components/driver-add/driver-add.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    DriverComponent,
    DriverEditComponent,
    DriverOverviewComponent,
    DriverAddComponent,
  ],
  providers: [
    DriverService
  ],
  exports: [
    FormsModule
  ]
})
export class DriverModule { }
