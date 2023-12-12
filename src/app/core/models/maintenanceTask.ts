import { Entity } from "./entity";

export interface MaintenanceTask extends Entity {
    maintenanceID: number;
    description: string;
}