import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }
  
  errorTranslator(errors: ValidationErrors, errorMessages: { [key: string]: string }[]): string | undefined {
    //This function expects a list of validationerrors and a list of appropriate errormessages
    //and will look for the first error in the list of validationerrors 
    //and will return the corresponding errormessage for the first error 
    const firstErrorKey = Object.keys(errors)[0]; 
  
    for (const errorMessagesObj of errorMessages) {
      if (errorMessagesObj.hasOwnProperty(firstErrorKey)) {
        return errorMessagesObj[firstErrorKey]; 
      }
    }
  
    return undefined; 
  }
}
