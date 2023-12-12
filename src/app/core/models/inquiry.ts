import { Entity } from "./entity";

export interface Inquiry extends Entity {
    inquiryDate: Date;
    inquiryCategory: string | null;
    inquiryTypeID: number;
    inquiryTypeName: string | null;
    driverID: number | null;
    driverFullName: string | null;
    vehicleID: number | null;
    vehicleName: string | null;
    comment: string | null;
    status: string | null;
    preferredDate: Date | null;
    preferredDateBackup: Date | null;
}
