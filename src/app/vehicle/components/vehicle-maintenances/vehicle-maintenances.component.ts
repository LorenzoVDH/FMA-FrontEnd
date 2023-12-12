import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Maintenance } from 'src/app/core/models/maintenance';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';
import { OverviewTableColumn } from 'src/app/shared/classes/overview-table-column';

@Component({
  selector: 'app-vehicle-maintenances',
  templateUrl: './vehicle-maintenances.component.html',
  styleUrls: ['./vehicle-maintenances.component.css']
})
export class VehicleMaintenancesComponent implements OnInit {
  vehicleId!:number; 
  maintenances!:Maintenance[]; 

  constructor(private route:ActivatedRoute, private maintenanceService:MaintenanceService) { }

  columns: OverviewTableColumn[] = [
    { key: 'date', name: 'Date'}, 
    { key: 'invoiceFilePath', name: 'Invoice'}
  ];

  ngOnInit(): void {
    this.vehicleId = Number(this.route.snapshot.paramMap.get('vehicleId'));
    
    this.maintenanceService.getMaintenancesOfVehicle(this.vehicleId).subscribe(
      incomingData => { this.maintenances = incomingData
        console.log(this.maintenances);
      }
    );
  }
}
