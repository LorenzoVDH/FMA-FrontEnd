import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vehicle } from 'src/app/core/models/vehicle';
import { StringFormatterService } from 'src/app/core/services/string-formatter.service';
import { OverviewTableColumn } from 'src/app/shared/classes/overview-table-column';

@Component({
  selector: 'app-vehicle-overview',
  templateUrl: './vehicle-overview.component.html',
  styleUrls: ['./vehicle-overview.component.css']
})
export class VehicleOverviewComponent {
  @Input() vehiclesList: Vehicle[] = [];

  constructor(private stringFormatter:StringFormatterService){}

  columns: OverviewTableColumn[] = [
    { key: 'id', name: 'ID'},
    { key: 'name', name: 'Name'}, 
    { key: 'chassisNumber', name: 'Chassis'},
    { key: 'fuelType', name: 'Fuel'},
    { key: 'vehicleTypeName', name: 'Type'},
    { key: 'registrationDate', name: 'Registration'},
    { key: 'leasingStartDate', name: 'Leasing Start'},
    { key: 'leasingEndDate', name: 'Leasing End'},
  ];

  formatValue(value:any):string{
    return this.stringFormatter.formatValue(value);
  }
}
