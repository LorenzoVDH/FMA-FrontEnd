import { Component, Output, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Driver } from 'src/app/core/models/driver';
import { DriverService } from 'src/app/core/services/driver.service';
import { PopupService } from '../core/services/popup.service';
import { PaginationSettings } from '../core/models/paginationSettings';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
})

export class DriverComponent implements OnInit {
  drivers!:Driver[];
  currentDriver!:Driver;
  showActive:boolean = true;
  @Output() pagination!:PaginationSettings;  
  @Output() showActiveDriversOverview: boolean = true;

  constructor(private driverService: DriverService, private router:Router, private popupService:PopupService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      //convert the text "true" into an real true, also give true if the parameter 'active'  is not defined. 
      const query_active = params['active'] === "true" ? true : params['active'] === undefined ? true : false;
      
      this.pagination = {
        pageIndex: Number(params['pageIndex']) || 0,
        pageLength: Number(localStorage.getItem('paginationdrivers')) || 10,
        entityName:"drivers",
        maxPages: 0
      }

      this.showActive = query_active;

      this.driverService.getDrivers(this.showActive, this.pagination.pageIndex, this.pagination.pageLength).subscribe(
        response => {
          const { drivers, totalCount } = response;
          this.drivers = drivers;
          this.pagination.maxPages = Math.ceil(totalCount / this.pagination.pageLength)-1;
        }
      );
    });
  }

  setDriverActive(driver: Driver) {
    this.driverService.updateDriver(driver).subscribe(
      updatedDriver => {
        let message = `Driver ${updatedDriver.id}: ${updatedDriver.firstName} ${updatedDriver.lastName} has been set to ${updatedDriver.active ? "active" : "inactive"}.`;
        this.popupService.openPopup(message).subscribe(() => {
          this.router.navigateByUrl(`/drivers?pageIndex=0&pageLength=${this.pagination.pageLength}&active=${updatedDriver.active}`);
        });
      },
      error => {
        this.popupService.openPopup("Something went wrong, contact technical support.", [error.error]);
      }
    );
  }

  onClick_showActiveDrivers(active: boolean) {
    this.router.navigateByUrl(`/drivers?pageIndex=0&pageLength=${this.pagination.pageLength}&active=${active}`);
  }
  
  onClick_gotoAddDriver(){
    this.router.navigate(['drivers/add']);
  }
}
