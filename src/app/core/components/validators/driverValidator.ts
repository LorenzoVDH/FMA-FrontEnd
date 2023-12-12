import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class driverValidator {
    static nationalRegistrationNumberValidator(control: AbstractControl): ValidationErrors | null {
        const nrn = control.value;
        const sanitizedNRN = nrn.replace(/[.,-]/g, ''); // Remove symbols: . , - to clean up the nrn 

        const birthdateControl = control.root.get('dateOfBirth');
        const birthdate = birthdateControl?.value;
        let expectedBirthdate = "";

        if (birthdate) {
            const dateParts = birthdate.split('-');
            const year = dateParts[0].slice(-2); // Extract the last two digits of the year
            const month = dateParts[1];
            const day = dateParts[2];
            expectedBirthdate = year + month + day;
        }

        if (sanitizedNRN.length !== 11) {
            return { lengthError: true }; // Return a validation error if the length is not 11
        }

        if (!expectedBirthdate || expectedBirthdate.length !== 6 || !sanitizedNRN.startsWith(expectedBirthdate)) {
            return { birthdateError: true }; // Return a validation error if the first 6 digits don't match the birthdate
        }

        return null; // Return null if the validation passes
    }
}