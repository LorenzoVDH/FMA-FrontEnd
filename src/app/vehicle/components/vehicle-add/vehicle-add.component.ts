import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { VehicleService } from 'src/app/core/services/vehicle.service';
import { PopupService } from 'src/app/core/services/popup.service';
import { FormValidationService } from 'src/app/core/services/formvalidation.service';
import { Router } from '@angular/router';
import { VehicleType } from 'src/app/core/models/vehicleType';
//import { VehicleValidator } from 'src/app/core/components/validators/vehicleValidator';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['../vehicle-edit/vehicle-edit.component.css']
})
export class VehicleAddComponent {
  vehicleForm: FormGroup; 
  vehicleTypesList!:VehicleType[];

  constructor(private formBuilder: FormBuilder, 
              private vehicleService: VehicleService, 
              private router: Router, 
              private popupService: PopupService, 
              private formValidationService:FormValidationService) {
    this.vehicleForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      chassisNumber: ['', [Validators.required, Validators.maxLength(30)]],
      fuelType: ['',[]],
      vehicleTypeID: [0,[]],
      registrationDate: [new Date().toISOString().split('T')[0],[Validators.required]],
      leasingStartDate: [new Date().toISOString().split('T')[0],[Validators.required]],
      leasingEndDate: [new Date().toISOString().split('T')[0],[Validators.required]],
      currentLicensePlateNumber: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      mileage: ['', []]
    });
    this.vehicleService.getVehicleTypes().subscribe(
      incomingData => this.vehicleTypesList = incomingData
    );
  }

  getErrorMessagesArrayForField(fieldname:string){
    return this.vehicleService.errorMessages[fieldname]; 
  }
  
  errorTranslator(errors: ValidationErrors, errorMessages: { [key: string]: string }[]): string | undefined {
    return this.formValidationService.errorTranslator(errors, errorMessages);
  }

  addVehicle() {
    if (this.vehicleForm.invalid) {
      return;
    }
    let vehicleData = this.vehicleForm.value;
    vehicleData.licensePlateStartDate = new Date();

    console.log(vehicleData);

    this.vehicleService.addVehicle(vehicleData).subscribe(
      addedVehicle => {
        let message = `Vehicle ${vehicleData.name} has been added.`;
        let submessage = this.vehicleService.generateStringArrayWithVehicleProperties(addedVehicle);

        this.popupService.openPopup(message, submessage).subscribe(() => this.router.navigate(['/vehicles']));
      },
      error => {
        console.log(error); 
        this.popupService.openPopup("Something went wrong, contact technical support.", [error.error]);
      }
    );
  }
}
