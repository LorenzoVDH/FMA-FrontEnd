import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { driverValidator } from './driverValidator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    driverValidator
  ]
})
export class ValidatorsModule { }
