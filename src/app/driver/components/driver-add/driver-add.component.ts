import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DriverService } from 'src/app/core/services/driver.service';
import { PopupService } from 'src/app/core/services/popup.service';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FormValidationService } from 'src/app/core/services/formvalidation.service';
import { driverValidator } from 'src/app/core/components/validators/driverValidator';


@Component({
  selector: 'app-driver-add',
  templateUrl: './driver-add.component.html',
  styleUrls: ['../driver-edit/driver-edit.component.css']
})

export class DriverAddComponent {
  driverForm: FormGroup; 

  constructor(private formBuilder: FormBuilder, 
              private driverService: DriverService, 
              private router: Router, 
              private popupService: PopupService, 
              private formValidationService:FormValidationService) {
    this.driverForm = this.formBuilder.group({
      active: [true],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      dateOfBirth: [new Date().toISOString().split('T')[0], [Validators.required]],
      nationalRegistrationNumber: ['', [Validators.required, driverValidator.nationalRegistrationNumberValidator.bind(this)]],
      addressPostalCode: ['', Validators.maxLength(16)],
      addressHouseNumber: ['', Validators.maxLength(5)],
      addressStreet: ['', Validators.maxLength(60)],
      addressCity: ['', Validators.maxLength(60)],
      licenseType: ['', Validators.required]
    });
  }

  getErrorMessagesArrayForField(fieldname:string){
    return this.driverService.errorMessages[fieldname]; 
  }
  
  errorTranslator(errors: ValidationErrors, errorMessages: { [key: string]: string }[]): string | undefined {
    return this.formValidationService.errorTranslator(errors, errorMessages);
  }

  addDriver() {
    if (this.driverForm.invalid) {
      return;
    }
    let driverData = this.driverForm.value;

    //Before adding the actual driver, sanitize the nrn
    driverData.nationalRegistrationNumber = driverData.nationalRegistrationNumber.replace(/[.,-]/g, '');

    this.driverService.addDriver(driverData).subscribe(
      addedDriver => {
        let message = `Driver ${driverData.firstName} ${driverData.lastName} has been added.`;
        let submessage = this.driverService.generateStringArrayWithDriverProperties(addedDriver);

        this.popupService.openPopup(message, submessage).subscribe(() => this.router.navigate(['/drivers']));
      },
      error => {
        this.popupService.openPopup("Something went wrong, contact technical support.", [error.error]);
      }
    );
  }
}