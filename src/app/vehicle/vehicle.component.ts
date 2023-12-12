import { Component, Output } from '@angular/core';
import { Vehicle } from '../core/models/vehicle';
import { VehicleService } from '../core/services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupService } from '../core/services/popup.service';
import { PaginationSettings } from '../core/models/paginationSettings';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent {
  vehicles!:Vehicle[]; 
  @Output() pagination!:PaginationSettings;

  constructor(private vehicleService: VehicleService, private router:Router, private popupService:PopupService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      //Set the pagination settings for the get request
      this.pagination = {
        pageIndex: Number(params['pageIndex']) || 0,
        pageLength: Number(localStorage.getItem('paginationvehicles')) || 10,
        entityName: "vehicles",
        maxPages: 0
      }

      this.vehicleService.getVehicles(this.pagination.pageIndex, this.pagination.pageLength).subscribe(
        response => {
          const { vehicles, totalCount } = response;
          this.vehicles = vehicles;
          this.pagination.maxPages = Math.ceil(totalCount / this.pagination.pageLength)-1;
        }
      );
    });
  }

  onClick_gotoAddVehicle(){
    this.router.navigate(['vehicles/add']);
  }
}
