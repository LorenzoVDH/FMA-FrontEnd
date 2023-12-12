import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inquiry } from 'src/app/core/models/inquiry';
import { InquiryService } from 'src/app/core/services/inquiry.service';
import { PopupService } from 'src/app/core/services/popup.service';
import { StringFormatterService } from 'src/app/core/services/string-formatter.service';
import { OverviewTableColumn } from 'src/app/shared/classes/overview-table-column';

@Component({
  selector: 'app-inquiry-overview',
  templateUrl: './inquiry-overview.component.html',
  styleUrls: ['./inquiry-overview.component.css']
})
export class InquiryOverviewComponent implements OnInit{
  constructor(private stringFormatter:StringFormatterService, private popupService:PopupService, private inquiryService:InquiryService){}
  @Input() inquiryList:Inquiry[] = [];
  inquiryListUnchanged!:Inquiry[];

  columns: OverviewTableColumn[] = [
    { key: 'inquiryDate', name: 'Date' },
    { key: 'inquiryCategory', name: 'Category'},
    { key: 'inquiryTypeName', name: 'Type'}, 
    { key: 'driverFullName', name: 'Driver'},
    { key: 'vehicleName', name: 'Vehicle' },
    { key: 'comment', name: 'Comment'},
    { key: 'preferredDate', name: 'Preferred Appointment Date A' },
    { key: 'preferredDateBackup', name: 'Preferred Appointment Date B' }
  ];

  ngOnInit(): void {
    this.inquiryListUnchanged = this.inquiryList.map(inquiry => ({ ...inquiry }));
  }

  formatValue(value:any):string{
    return this.stringFormatter.formatValue(value);
  }
  
  changeInquiryStatus(inquiry:Inquiry, status:string){
    console.log(this.inquiryListUnchanged);
    const unchangedInquiry = this.inquiryListUnchanged.find(i => i.id === inquiry.id);
    console.log(unchangedInquiry); 

    this.popupService.openPopup("Change status?", [this.formatValue(inquiry.inquiryDate) + " - " + inquiry.inquiryTypeName, 
                                                  inquiry.driverFullName,
                                                   `Change status from ${unchangedInquiry.status} to ${inquiry.status}?`], true).subscribe(answer => {
      if (answer) {
        this.inquiryService.updateInquiry(inquiry).subscribe(
          () => location.reload()
        );
      } else {
        inquiry.status = unchangedInquiry.status;
      }
    });  
  }
}
