import { Driver } from "./driver";
import { Entity } from "./entity";

export interface Vehicle extends Entity {
    name: string;
    chassisNumber: string;
    fuelType: string;
    vehicleTypeID: number;
    registrationDate: Date | null;
    leasingStartDate: Date | null;
    leasingEndDate: Date | null;
    currentLicensePlateNumber: string;
    pendingLicensePlateNumber: string | null; 
    licensePlateStartDate: Date | null;
    pendingLicensePlateStartDate: Date | null;
    mileage: number;
    drivers: Driver[];
}