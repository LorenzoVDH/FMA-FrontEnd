import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver } from 'src/app/core/models/driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private readURL = 'http://127.0.0.1:7150/Read/Drivers';
  private writeURL = 'http://127.0.0.1:7031/Write/Drivers';

  //Todo: implement stores properly 

  //STORES 
  private $currentDriver!: Observable<Driver>;
  private $incomingDrivers!: Observable<[Driver[], number]>;
  
  //Error messages
  errorMessages: { [key: string]: { [key: string]: string }[] } = {
    nationalRegistrationNumber: [
      { required: 'Please type in a National Registration Number.' },
      { lengthError: 'A National Registration Number should be 11 characters long.' },
      { birthdateError: 'The first 6 characters of the National Registration Number are incorrect.' }
    ],
    lastName: [
      { required: 'Please type in a name.' },
      { maxlength: 'The length of the last name should not exceed 50 characters.' }
    ],
    firstName: [
      { required: 'Please type in a name.' },
      { maxlength: 'The length of the first name should not exceed 50 characters.' }
    ],
    dateOfBirth: [
      { required: 'Please fill in a date of birth.' }
    ],
    addressPostalCode: [
      { maxlength: 'Please make sure the postal code doesn\'t exceed 16 characters.' }
    ],
    addressHouseNumber: [
      { maxlength: 'Please make sure the house number doesn\'t exceed 5 characters.' }
    ],
    addressStreet: [
      { maxlength: 'Please make sure the street name doesn\'t exceed 60 characters.' }
    ],
    addressCity: [
      { maxlength: 'Please make sure the city name doesn\'t exceed 60 characters.' }
    ],
    licenseType: [
      { required: 'Please fill in the driver\'s license.' }
    ]
  };
  
  constructor(private http: HttpClient) { }

  private loadDriversToStore(active: boolean, pageIndex: number, pageLength: number) {
    //This function does a GET request to the API and stores the observable into $incomingDrivers 
    //The type of request is determined by the size of the page and the index of the page, as well
    //as if only the active drivers should be read  
    let getDriversReadURL = this.readURL + "?" + "active=" + active + "&pageIndex=" + pageIndex + "&pageLength=" + pageLength;
    this.$incomingDrivers = this.http.get<any>( getDriversReadURL );
    this.$incomingDrivers.subscribe(
      incomingData => { 
        console.log(incomingData); 
      } 
    );
  }

  private loadCurrentDriverToStore(id: number) {
    //This function does a GET request to the API and stores the observable into $currentDriver 
    this.$currentDriver = this.http.get<Driver>(this.readURL + '/' + id);
  }

  getDriver(id: number): Observable<Driver> {
    this.loadCurrentDriverToStore(id);
    return this.$currentDriver;
  }

  getDrivers(active: boolean, pageIndex: number = 0, pageLength: number = 10): Observable<any> {
    this.loadDriversToStore(active, pageIndex, pageLength);
    return this.$incomingDrivers;
  }

  updateDriver(driver: Driver): Observable<Driver> {
    // Set the currentDriver to the observable for updating the driver 
    // (when the driver's data is updated, it returns the updated driver)
    // then return this observable (not the Driver itself) 
    this.$currentDriver = this.http.put<Driver>(this.writeURL, driver);
    return this.$currentDriver;
  }

  addVehicleToDriver(driverId: number, vehicleId: number): Observable<any> {
    const url = this.writeURL + "/AddVehicleAssociation?driverId="+driverId+"&vehicleId="+vehicleId;
    return this.http.put<any>(url, null); 
  }

  removeVehicleFromDriver(driverId: number, vehicleId: number): Observable<any> {
    const url = this.writeURL + "/RemoveVehicleAssociation?driverId="+driverId+"&vehicleId="+vehicleId;
    return this.http.delete<any>(url);
  }

  addDriver(driver: Driver): Observable<Driver> {
    this.$currentDriver = this.http.post<Driver>(this.writeURL, driver);
    return this.$currentDriver;
  }

  generateStringArrayWithDriverProperties(driver: Driver): string[] {
    let driverInfo = [];

    driverInfo.push("ID: " + driver.id);
    driverInfo.push("First Name: " + driver.firstName);
    driverInfo.push("Last Name: " + driver.lastName);
    driverInfo.push("Active: " + (driver.active ? "Yes" : "No"));
    driverInfo.push("National Registration Number: " + driver.nationalRegistrationNumber);
    driverInfo.push("Date of birth: " + new Date(driver.dateOfBirth).toLocaleDateString('nl-BE'));
    driverInfo.push("License: " + driver.licenseType);
    driverInfo.push("Street: " + driver.addressStreet + " " + driver.addressHouseNumber);
    driverInfo.push("Postalcode: " + driver.addressPostalCode + ", " + driver.addressCity);

    return driverInfo;
  }

  //Generalize this so that it doesn't have to be added to each entity 
  generateStringArrayWithDriverDifferingProperties(driver1: Driver, driver2: Driver): string[] {
    //This method compares two drivers and will give a string[] back with all the differing properties 
    const differingProperties: string[] = [];

    // for (let key in driver1) {
    //   if (driver1.hasOwnProperty(key) && driver2.hasOwnProperty(key)) {
    //     if (driver1[key as keyof Driver] !== driver2[key as keyof Driver]) {
    //       differingProperties.push(key);
    //     }
    //   }
    // }
    
    if (driver1.active !== driver2.active){
      differingProperties.push("Driver Active: " + (driver1.active ? "Yes" : "No") + " --> " + (driver2.active ? "Yes" : "No"));
    }
    if (driver1.addressCity !== driver2.addressCity){
      differingProperties.push("City: " + driver1.addressCity + " --> " + driver2.addressCity);
    }
    if (driver1.addressHouseNumber !== driver2.addressHouseNumber){
      differingProperties.push("Housenumber: " + driver1.addressHouseNumber + " --> " + driver2.addressHouseNumber);
    }
    if (driver1.addressPostalCode !== driver2.addressPostalCode){
      differingProperties.push("Postalcode: " + driver1.addressPostalCode + " --> " + driver2.addressPostalCode);
    }
    if (driver1.addressStreet !== driver2.addressStreet){
      differingProperties.push("Street: " + driver1.addressStreet + " --> " + driver2.addressStreet);
    }
    if (driver1.dateOfBirth !== driver2.dateOfBirth){
      differingProperties.push("Date of birth: " + new Date(driver1.dateOfBirth).toDateString() + " --> " + new Date(driver2.dateOfBirth).toDateString());
    }
    if (driver1.firstName !== driver2.firstName){
      differingProperties.push("First name: " + driver1.firstName + " --> " + driver2.firstName);
    }
    if (driver1.lastName !== driver2.lastName){
      differingProperties.push("Last name: " + driver1.lastName + " --> " + driver2.lastName);
    }
    if (driver1.licenseType !== driver2.licenseType){
      differingProperties.push("License: " + driver1.licenseType + " --> " + driver2.licenseType);
    }
    if (driver1.nationalRegistrationNumber !== driver2.nationalRegistrationNumber){
      differingProperties.push("National Registration Number: " + driver1.nationalRegistrationNumber + " --> " + driver2.nationalRegistrationNumber);
    }

    return differingProperties;
  }
  
  searchDriver(searchTerm:String):Observable<any>{
    //return any, because this may implement pagination, where both the drivers are returned as well as the number of drivers in total 
    let getDriversReadURL = this.readURL + "/GetBySearchTerm?searchTerm=" + searchTerm;
    this.$incomingDrivers = this.http.get<any>( getDriversReadURL );
    this.$incomingDrivers.subscribe(
      incomingData => { 
        console.log(incomingData); 
      } 
    );
    return this.$incomingDrivers;
  }
}

