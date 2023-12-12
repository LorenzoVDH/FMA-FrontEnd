import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Maintenance } from '../models/maintenance';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  private readURL = 'http://127.0.0.1:7150/Read/Maintenances';
  private writeURL = 'http://127.0.0.1:7031/Write/Maintenances';

  private $maintenancesOfVehicle!:Observable<Maintenance[]>;

  constructor(private http: HttpClient) { }
  
  private loadMaintenancesOfVehicleToStore(vehicleId:number){
    const url = this.readURL + "/Vehicle/" + vehicleId;
    this.$maintenancesOfVehicle = this.http.get<Maintenance[]>(url);
  }

  getMaintenancesOfVehicle(vehicleId:number):Observable<Maintenance[]>{
    this.loadMaintenancesOfVehicleToStore(vehicleId); 
    return this.$maintenancesOfVehicle; 
  }
}
