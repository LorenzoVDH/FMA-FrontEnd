import { Entity } from "./entity";
import { Vehicle } from "./vehicle";

export interface Driver extends Entity {
    lastName: string;
    firstName: string;
    active: boolean;
    dateOfBirth: Date;
    nationalRegistrationNumber: string;
    addressPostalCode: string | null;
    addressHouseNumber: string | null;
    addressStreet: string | null;
    addressCity: string | null;
    licenseType: string | null;
    vehicles: Vehicle[] | null;
}
