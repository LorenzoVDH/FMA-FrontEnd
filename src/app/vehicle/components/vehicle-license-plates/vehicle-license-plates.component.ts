import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Licenseplate } from 'src/app/core/models/licenseplate';
import { VehicleService } from 'src/app/core/services/vehicle.service';
import { OverviewTableColumn } from 'src/app/shared/classes/overview-table-column';

@Component({
  selector: 'app-vehicle-license-plates',
  templateUrl: './vehicle-license-plates.component.html',
  styleUrls: ['./vehicle-license-plates.component.css']
})
export class VehicleLicensePlatesComponent implements OnInit {
  vehicleId!:number;
  vehicleName!:string; 
  licenseplates!:Licenseplate[];

  constructor(private route:ActivatedRoute, private vehicleService:VehicleService){}
  
  columns: OverviewTableColumn[] = [
    { key: 'validityStartDate', name: 'Start' },
    { key: 'validityEndDate', name: 'End' },
    { key: 'licensePlateNumber', name: 'Licenseplate'}
  ];

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('vehicleId');
    this.vehicleId = Number(idParam); 
    this.vehicleService.getVehicle(this.vehicleId).subscribe(
      incomingVehicle => {
        this.vehicleName = incomingVehicle.name + " (" + incomingVehicle.chassisNumber + ")";
      }
    );

    if (!isNaN(this.vehicleId)){
      this.vehicleService.getLicensePlates(this.vehicleId).subscribe(
        response => {
          this.licenseplates = response;
        }
      )
    }
  }
}