import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver } from 'src/app/core/models/driver';
import { DriverService } from 'src/app/core/services/driver.service';
import { PopupService } from 'src/app/core/services/popup.service';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { FormValidationService } from 'src/app/core/services/formvalidation.service';
import { driverValidator } from 'src/app/core/components/validators/driverValidator';
import { Vehicle } from 'src/app/core/models/vehicle';
import { VehicleService } from 'src/app/core/services/vehicle.service';

@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: ['./driver-edit.component.css'],
})

export class DriverEditComponent implements OnInit{
  unchangedDriver!:Driver;
  driverForm!: FormGroup; 
  saveButtonClicked = false;
  vehicleToBeAdded!:Vehicle;
  driverId!:number;

  driverVehicleForm!:FormGroup; 
  vehicleSearchResults!:Vehicle[];
  vehicles!:Vehicle[];

  constructor(private formBuilder: FormBuilder, 
              private driverService: DriverService, 
              private vehicleService: VehicleService,
              private route: ActivatedRoute, 
              private router:Router, 
              private popupService:PopupService, 
              private formValidationService:FormValidationService) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('driverId');
    this.driverId = Number(idParam);

    if (!isNaN(this.driverId)) {
      this.driverService.getDriver(this.driverId).subscribe(
        incomingData => {
          this.unchangedDriver = {...incomingData};
          this.driverForm = this.formBuilder.group({
            id: [incomingData.id],
            active: [incomingData.active],
            lastName: [incomingData.lastName, [Validators.required, Validators.maxLength(50)]],
            firstName: [incomingData.firstName, [Validators.required, Validators.maxLength(50)]],
            dateOfBirth: [formatDate(new Date(incomingData.dateOfBirth), 'yyyy-MM-dd', 'en'), [Validators.required]],
            nationalRegistrationNumber: [incomingData.nationalRegistrationNumber, [Validators.required, driverValidator.nationalRegistrationNumberValidator.bind(this)]],
            addressPostalCode: [incomingData.addressPostalCode, Validators.maxLength(16)],
            addressHouseNumber: [incomingData.addressHouseNumber, Validators.maxLength(5)],
            addressStreet: [incomingData.addressStreet, Validators.maxLength(60)],
            addressCity: [incomingData.addressCity, Validators.maxLength(60)],
            licenseType: [incomingData.licenseType, Validators.required],
            vehicles: [incomingData.vehicles],
            selectedVehicle: ['']
          });
          this.driverVehicleForm = this.formBuilder.group({
            vehicleId: [null, [Validators.required]],
            driverId: [incomingData.id, [Validators.required]]
          });
        }
      );
    }
  }

  saveDriver() {
    if (this.driverForm.invalid) {
      return;
    }
    let driverData = this.driverForm.value;

    //Before editting the actual driver, sanitize the nrn
    driverData.nationalRegistrationNumber = driverData.nationalRegistrationNumber.replace(/[.,-]/g, '');

    this.driverService.updateDriver(driverData).subscribe(
      updatedDriver => {
        let message = `Driver ${driverData.id}: ${driverData.firstName} ${driverData.lastName} has been updated. Changes:`;
        let submessage = this.driverService.generateStringArrayWithDriverDifferingProperties(this.unchangedDriver, updatedDriver); 
        
        if (submessage.length === 0){
          message = "No changes were made.";
        }

        this.popupService.openPopup(message, submessage).subscribe(() => this.router.navigate(['/drivers']));
      },
      error => {
        this.popupService.openPopup("Something went wrong, contact technical support.", [error.error]);
      }
    );
  }

  getErrorMessagesArrayForField(fieldname:string){
    return this.driverService.errorMessages[fieldname]; 
  }
  
  errorTranslator(errors: ValidationErrors, errorMessages: { [key: string]: string }[]): string | undefined {
    return this.formValidationService.errorTranslator(errors, errorMessages);
  }

  mouseOver_save(){
    this.saveButtonClicked = true;
  }

  onClick_removeVehicle(vehicleId: number) {
    let message = `Would you like to remove this Vehicle from this Driver?`;

    this.popupService.openPopup(message, [], true).subscribe(answer => {
      if (answer) {
        this.vehicleService.getVehicle(vehicleId).subscribe(
          incomingVehicle => {
            this.driverService.removeVehicleFromDriver(this.driverId, vehicleId).subscribe( () => { 
                this.popupService.openPopup(`Removed Vehicle ${incomingVehicle.name} from Driver`).subscribe(() => location.reload())
              }
            )
          }
        )
      }
    })
  }

  onChange_searchVehicle(searchTerm:string){
    if (searchTerm.length >= 3){
      this.vehicleService.searchVehicle(searchTerm).subscribe(
        incomingData => {
          this.vehicleSearchResults = incomingData;
        }
      ); 
    }
  }

  onClick_gotoAddVehicle(){
    this.router.navigate(['vehicles/add']);
  }

  onClick_deactivateDriver(){
    let message = `Would you like to deactivate this driver? This action cannot be undone!`;
    let submessage = [this.driverForm.controls['firstName'].toString() + " " + this.driverForm.controls['lastName'].toString()];
    this.popupService.openPopup(message, [], true).subscribe(answer => {
      if (answer) {
        this.unchangedDriver.active = false;
        this.driverService.updateDriver(this.unchangedDriver).subscribe(() => this.router.navigate(['/drivers']));
      }
    });  
  }

  onClick_addVehicleToDriver(){
    if (this.driverVehicleForm.invalid){
      return;
    }

    let driverVehicleData = this.driverVehicleForm.value; 
    this.driverService.addVehicleToDriver(driverVehicleData.driverId, driverVehicleData.vehicleId).subscribe(
      incomingData => {
        let message = `Added the chosen vehicle to this driver.`;
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
}
