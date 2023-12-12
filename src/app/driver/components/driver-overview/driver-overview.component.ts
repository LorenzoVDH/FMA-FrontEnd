import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Driver } from 'src/app/core/models/driver';
import { OverviewTableColumn } from 'src/app/shared/classes/overview-table-column';

@Component({
  selector: 'app-driver-overview',
  templateUrl: './driver-overview.component.html',
  styleUrls: ['./driver-overview.component.css'],
})

export class DriverOverviewComponent {
  @Input() driversList: any[] = [];
  @Output() changeDriverActiveEvent:EventEmitter<Driver> = new EventEmitter<Driver>(); 

  columns: OverviewTableColumn[] = [
    { key: 'id', name: 'ID'},
    { key: 'firstName', name: 'First Name'},
    { key: 'lastName', name: 'Last Name'},
    { key: 'dateOfBirth', name: 'Date Of Birth'},
    { key: 'nationalRegistrationNumber', name: 'National Registration Number'},
    { key: 'licenseType', name: 'License'},
  ];

  constructor() { }

  onClick_setDriverActive(driver: Driver, active: boolean) {
    let updatedDriver:Driver = { ...driver}; //copy the driver to a new driver
    updatedDriver.active = active; //change the active property 
    this.changeDriverActiveEvent.emit(updatedDriver); //send the newly updated driver via an event 
  }
}
