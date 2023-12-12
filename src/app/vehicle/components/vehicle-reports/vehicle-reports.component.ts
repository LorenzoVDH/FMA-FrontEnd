import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleQuarterlyReport } from 'src/app/core/models/vehicleQuarterlyReport';
import { VehicleService } from 'src/app/core/services/vehicle.service';
import { OverviewTableColumn } from 'src/app/shared/classes/overview-table-column';

@Component({
  selector: 'app-vehicle-reports',
  templateUrl: './vehicle-reports.component.html',
  styleUrls: ['./vehicle-reports.component.css']
})
export class VehicleReportsComponent implements OnInit {
  vehicleId!:number;
  vehiclesQuarterlyReportsList!:VehicleQuarterlyReport[];

  constructor(private route:ActivatedRoute, private vehicleService:VehicleService){ }

  columns: OverviewTableColumn[] = [
    { key: 'year', name: 'Year' },
    { key: 'quarter', name: 'Quarter' },
    { key: 'damageReports', name: 'Damage Reports' },
    { key: 'maintenances', name: 'Maintenances' }, 
    { key: 'repairs', name: 'Repairs' } 
  ];
  
  ngOnInit(){
    const idParam = this.route.snapshot.paramMap.get('vehicleId');
    this.vehicleId = Number(idParam);
    
    if (!isNaN(this.vehicleId)) {
      this.vehicleService.getVehicleQuarterlyReports(this.vehicleId).subscribe(
        response => {
          this.vehiclesQuarterlyReportsList = response;   
        }
      );
    }
  }
}

