import { Entity } from "./entity";
import { MaintenanceTask } from "./maintenanceTask";

export interface Maintenance extends Entity {
    vehicleID: number;
    date: string;
    cost: number | null;
    garageID: number | null;
    garageName: string | null;
    invoiceFilePath: string | null;
    tasks: MaintenanceTask[] | null;
}