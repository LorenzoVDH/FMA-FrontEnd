import { Entity } from "./entity";

export interface Licenseplate extends Entity {
    vehicleID: number;
    validityStartDate: Date;
    validityEndDate: Date | null;
    licensePlateNumber: string;
}
