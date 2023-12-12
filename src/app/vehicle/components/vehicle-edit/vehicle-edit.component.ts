import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver } from 'src/app/core/models/driver';
import { Vehicle } from 'src/app/core/models/vehicle';
import { VehicleType } from 'src/app/core/models/vehicleType';
import { DriverService } from 'src/app/core/services/driver.service';
import { PopupService } from 'src/app/core/services/popup.service';
import { StringFormatterService } from 'src/app/core/services/string-formatter.service';
import { VehicleService } from 'src/app/core/services/vehicle.service';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent {
  unchangedVehicle!:Vehicle; 
  vehicleForm!: FormGroup; 
  driverVehicleForm!:FormGroup; 
  vehicleId!:number;
  saveButtonClicked = false; 
  driverSearchResults!:Driver[];
  drivers!:Driver[];
  vehicleTypesList!:VehicleType[];
  pendingLicensePlateStartDate?:Date;
  
  constructor(private route:ActivatedRoute, 
              private vehicleService:VehicleService, 
              private formBuilder:FormBuilder, 
              private popupService:PopupService,
              private router:Router,
              private driverService:DriverService,
              private stringFormatterService:StringFormatterService){}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('vehicleId');
    this.vehicleId = Number(idParam);
    
    if (!isNaN(this.vehicleId)) {
      this.vehicleService.getVehicleTypes().subscribe(
        incomingTypes => {
          this.vehicleTypesList = incomingTypes;
        }
      );
      this.vehicleService.getVehicle(this.vehicleId).subscribe(
        incomingData => {
          this.pendingLicensePlateStartDate = incomingData.pendingLicensePlateStartDate || undefined; 
          this.unchangedVehicle = {...incomingData};
          this.vehicleForm = this.formBuilder.group({
            id: [incomingData.id, [Validators.required]],
            name: [incomingData.name, [Validators.required]],
            chassisNumber: [incomingData.chassisNumber, [Validators.required]],
            fuelType: [incomingData.fuelType],
            vehicleTypeID: [incomingData.vehicleTypeID],
            registrationDate: [formatDate(new Date(incomingData.registrationDate || Date.now()), 'yyyy-MM-dd', 'en')],
            leasingStartDate: [formatDate(new Date(incomingData.leasingStartDate || Date.now()), 'yyyy-MM-dd', 'en')],
            leasingEndDate:   [formatDate(new Date(incomingData.leasingEndDate || Date.now()),   'yyyy-MM-dd', 'en')],
            currentLicensePlateNumber: [incomingData.currentLicensePlateNumber, [Validators.required, Validators.minLength(3)]],
            licensePlateStartDate: [formatDate(Date.now(), 'yyyy-MM-dd', 'en')],
            pendingLicensePlateNumber: [incomingData.pendingLicensePlateNumber],
            mileage: [incomingData.mileage, [Validators.min(incomingData.mileage)]]
          });
          this.driverVehicleForm = this.formBuilder.group({
            vehicleId: [incomingData.id, [Validators.required]],
            driverId: [null, [Validators.required]]
          });
        }
      );
      this.vehicleService.getVehicleDrivers(this.vehicleId).subscribe(
        incomingData => this.drivers = incomingData
      );
    }
  }

  mouseOver_save(){
    this.saveButtonClicked = true;
  }

  saveVehicle() {
    if (this.vehicleForm.invalid) {
      return;
    }
    
    let licensePlateChanged = this.unchangedVehicle.currentLicensePlateNumber != this.vehicleForm.controls['currentLicensePlateNumber'].value;

    if (licensePlateChanged){
      this.popupService.openPopup("Saving a new License Plate Number will remove any pending License Plates, is this what you want?", [], true).subscribe(answer => {
        if (answer) {
          this.executeUpdate();
        }
      });
    } else {
      this.executeUpdate();
    }
  }

  executeUpdate(){
    let vehicleData = this.vehicleForm.value;
    console.log(vehicleData); 

    this.vehicleService.updateVehicle(vehicleData).subscribe(
      updatedVehicle => {
        let message = `Vehicle ${vehicleData.id}: ${vehicleData.name} has been updated. Changes:`;
        let submessage = this.vehicleService.generateStringArrayWithVehicleDifferingProperties(this.unchangedVehicle, updatedVehicle); 
        
        if (submessage.length === 0){
          message = "No changes were made.";
        }

        this.popupService.openPopup(message, submessage).subscribe(() => this.router.navigate(['/vehicles']));
      },
      error => {
        console.log(error);
        this.popupService.openPopup("Something went wrong, contact technical support.", [error]);
      }
    );
  }

  onChange_searchDriver(searchTerm:string){
    if (searchTerm.length >= 3){
      this.driverService.searchDriver(searchTerm).subscribe(
        incomingData => {
          this.driverSearchResults = incomingData;
        }
      ); 
    }
  }

  onClick_addVehicleToDriver(){
    if (this.driverVehicleForm.invalid){
      return;
    }

    let driverVehicleData = this.driverVehicleForm.value; 
    this.driverService.addVehicleToDriver(driverVehicleData.driverId, driverVehicleData.vehicleId).subscribe(
      incomingData => {
        let message = `Added the selected driver as an owner of this vehicle`;
        this.popupService.openPopup(message).subscribe(() => location.reload())
      },
      error => {
        if (error.status === 400){
          let message = `Error: This driver already owns this vehicle.`;
          this.popupService.openPopup(message).subscribe(() => location.reload())
        }
      }
    );
  }

  onClick_removeDriver(driverId:number){
    let message = `Would you like to remove this Driver from this Vehicle?`;

    this.popupService.openPopup(message, [], true).subscribe(answer => {
      if (answer) {
        this.driverService.getDriver(driverId).subscribe(
          incomingDriver => {
            this.driverService.removeVehicleFromDriver(driverId, this.vehicleId).subscribe(() => { 
                this.popupService.openPopup(`Removed Driver ${incomingDriver.firstName} ${incomingDriver.lastName} from Vehicle`).subscribe(() => location.reload())
              }
            )
          }
        )
      }
    })
  }

  formatValue(value:any):string{
    return this.stringFormatterService.formatValue(value); 
  }

  onClick_removePendingLicensePlate(){
    this.vehicleService.removePendingLicensePlate(this.vehicleId);
  }

  onClick_deactivateVehicle(){
   const vehicleName = `#${this.vehicleId}: ${this.vehicleForm.controls['name'].value.toString()}`
   const message = `Would you like to deactivate this vehicle? This action cannot be undone!`; 
   const submessage = [vehicleName]; 
    this.popupService.openPopup(message, submessage, true).subscribe( answer => {
        if (answer) {
          this.vehicleService.deactivateVehicle(this.vehicleId).subscribe(() => { 
            this.popupService.openPopup(`Vehicle ${vehicleName}  Removed`).subscribe(() => this.router.navigate(['/vehicles']))
          });
        }
      }
    )
  }
}
