import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringFormatterService {

  constructor() { }

  formatValue(value: any): string {
    //This function formats the value that will be displayed in the column 
    if (this.isDateString(value)) {
      const dateObj = new Date(value);
      return dateObj.toLocaleDateString();
    }
    return value || '-';
  }

  isDateString(value: any): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?$/;
    return typeof value === 'string' && dateRegex.test(value);
  }
}
