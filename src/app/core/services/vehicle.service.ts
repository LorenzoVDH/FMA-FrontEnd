import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VehicleQuarterlyReport } from '../models/vehicleQuarterlyReport';
import { VehicleType } from '../models/vehicleType';
import { Driver } from '../models/driver';
import { Licenseplate } from '../models/licenseplate';

@Injectable({
  providedIn: 'root'
}) 

export class VehicleService {
  private readURL = 'http://127.0.0.1:7150/Read/Vehicles';
  private writeURL = 'http://127.0.0.1:7031/Write/Vehicles';

  //STORES 
  private $incomingVehicles!: Observable<[Vehicle[], number]>;  
  private $currentVehicle!: Observable<Vehicle>;
  private $incomingVehicleQuarterlyReports!:Observable<VehicleQuarterlyReport[]>;
  private $vehicleTypes!:Observable<VehicleType[]>;
  private $incomingDrivers!: Observable<Driver[]>;
  private $incomingLicenseplates!: Observable<Licenseplate[]>; 

  //Error messages
  errorMessages: { [key: string]: { [key: string]: string }[] } = { };

  constructor(private http: HttpClient) { }
  
  private loadVehiclesToStore(pageIndex: number, pageLength: number) {
    let getVehiclesReadURL = this.readURL + "?" + "&pageIndex=" + pageIndex + "&pageLength=" + pageLength;
    this.$incomingVehicles = this.http.get<any>(getVehiclesReadURL);
  }

  getVehicles(pageIndex: number = 0, pageLength: number = 10): Observable<any> {
    this.loadVehiclesToStore(pageIndex, pageLength);
    return this.$incomingVehicles;
  }

  private loadVehicleQuarterlyReportsToStore(vehicleId:number){
    let getVehiclesQuarterlyReportsReadURL = this.readURL + "/" + vehicleId + "/Reports";
    this.$incomingVehicleQuarterlyReports = this.http.get<any>(getVehiclesQuarterlyReportsReadURL); 
  }

  getVehicleQuarterlyReports(vehicleId:number):Observable<any>{
    this.loadVehicleQuarterlyReportsToStore(vehicleId);
    return this.$incomingVehicleQuarterlyReports; 
  }
  
  private loadCurrentVehicleToStore(id: number) {
    //This function does a GET request to the API and stores the observable into $currentDriver 
    this.$currentVehicle = this.http.get<Vehicle>(this.readURL + '/' + id);
  }

  getVehicle(id: number): Observable<Vehicle> {
    this.loadCurrentVehicleToStore(id);
    return this.$currentVehicle;
  }
  
  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    // Set the currentDriver to the observable for updating the driver 
    // (when the driver's data is updated, it returns the updated driver)
    // then return this observable (not the Driver itself) 
    this.$currentVehicle = this.http.put<Vehicle>(this.writeURL, vehicle);
    return this.$currentVehicle;
  }

  //Generalize this so that it doesn't have to be added to each entity 
  generateStringArrayWithVehicleDifferingProperties(vehicle1: Vehicle, vehicle2: Vehicle): string[] {
    //This method compares two drivers and will give a string[] back with all the differing properties 
    const differingProperties: string[] = [];

    if (vehicle1.name !== vehicle2.name){
      differingProperties.push("Vehicle Name: " + vehicle1.name + " --> " + vehicle2.name);
    }
    if (vehicle1.chassisNumber !== vehicle2.chassisNumber){
      differingProperties.push("Vehicle Chassis Number: " + vehicle1.chassisNumber + " --> " + vehicle2.chassisNumber);
    }
    if (vehicle1.fuelType !== vehicle2.fuelType){
      differingProperties.push("Vehicle Fuel Type: " + vehicle1.fuelType + " --> " + vehicle2.fuelType);
    }
    if (vehicle1.vehicleTypeID !== vehicle2.vehicleTypeID){
      differingProperties.push("Vehicle Type: " + vehicle1.vehicleTypeID + " --> " + vehicle2.vehicleTypeID); 
    }
    if (vehicle1.registrationDate !== vehicle2.registrationDate){
      differingProperties.push("Registration Date: " + vehicle1.registrationDate + " --> " + vehicle2.registrationDate); 
    }
    if (vehicle1.leasingStartDate !== vehicle2.leasingStartDate){
      differingProperties.push("Leasing Start Date: " + vehicle1.leasingStartDate + " --> " + vehicle2.leasingStartDate); 
    }
    if (vehicle1.leasingEndDate !== vehicle2.leasingEndDate){
      differingProperties.push("Leasing End Date: " + vehicle1.leasingEndDate + " --> " + vehicle2.leasingEndDate);
    }
    if (vehicle1.currentLicensePlateNumber !== vehicle2.currentLicensePlateNumber){
      differingProperties.push("Licenseplate: " + vehicle1.currentLicensePlateNumber + " --> " + vehicle2.currentLicensePlateNumber); 
    }
    if (vehicle1.mileage !== vehicle2.mileage){
      differingProperties.push("Mileage: " + vehicle1.mileage + " --> " + vehicle2.mileage); 
    }

    return differingProperties;
  }

  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    this.$currentVehicle = this.http.post<Vehicle>(this.writeURL, vehicle);
    return this.$currentVehicle;
  }

  generateStringArrayWithVehicleProperties(vehicle: Vehicle): string[] {
    let vehicleInfo = [];

    vehicleInfo.push("ID: " + vehicle.id);
    vehicleInfo.push("Name: " + vehicle.name);
    vehicleInfo.push("Chassis Number: " + vehicle.chassisNumber);
    vehicleInfo.push("Fuel Type: " + vehicle.fuelType);
    vehicleInfo.push("Vehicle Type ID: " + vehicle.vehicleTypeID);
    vehicleInfo.push("Registration Date: " + new Date(vehicle.registrationDate || Date.now()).toLocaleDateString('nl-BE'));
    vehicleInfo.push("Leasing Start Date: " + new Date(vehicle.leasingStartDate || Date.now()).toLocaleDateString('nl-BE'));
    vehicleInfo.push("Leasing End Date: " + new Date(vehicle.leasingEndDate || Date.now()).toLocaleDateString('nl-BE'));
    vehicleInfo.push("Mileage: " + vehicle.mileage);

    return vehicleInfo;
  }

  getVehicleTypes():Observable<VehicleType[]>{
    this.$vehicleTypes = this.http.get<VehicleType[]>(this.readURL + "/Types");
    return this.$vehicleTypes; 
  }

  removePendingLicensePlate(id:number){
    
  }

  getVehicleDrivers(vehicleId:number):Observable<Driver[]>{
    this.$incomingDrivers = this.http.get<Driver[]>(this.readURL + "/" + vehicleId + "/Drivers");
    return this.$incomingDrivers; 
  }

  searchVehicle(searchTerm:String):Observable<any>{
    let getVehiclesReadURL = this.readURL + "/GetBySearchTerm?searchTerm=" + searchTerm;
    this.$incomingVehicles = this.http.get<any>( getVehiclesReadURL );
    this.$incomingVehicles.subscribe(
      incomingData => { 
        console.log(incomingData); 
      } 
    );
    return this.$incomingVehicles;
  }

  addVehicleToDriver(vehicleId: number, driverId: number): Observable<any> {
    const url = this.writeURL + "/AddVehicleAssociation?driverId="+driverId+"&vehicleId="+vehicleId;
    return this.http.put<any>(url, null); 
  }

  removeVehicleFromDriver(vehicleId: number, driverId: number): Observable<any> {
    const url = this.writeURL + "/RemoveVehicleAssociation?driverId="+driverId+"&vehicleId="+vehicleId;
    return this.http.delete<any>(url);
  }

  deactivateVehicle(vehicleId:number):Observable<any>{
    const url = this.writeURL + "/Deactivate/"+vehicleId;
    return this.http.put<any>(url, null); 
  }

  getLicensePlates(vehicleId:number):Observable<Licenseplate[]>{
    const url = this.readURL + "/" + vehicleId + "/LicensePlateHistory";
    return this.http.get<any>(url);
  }
}
