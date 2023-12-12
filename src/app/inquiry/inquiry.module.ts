import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms'; 

import { InquiryComponent } from './inquiry.component';
import { InquiryOverviewComponent } from './inquiry-overview/inquiry-overview.component';
import { InquiryService } from '../core/services/inquiry.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    InquiryComponent,
    InquiryOverviewComponent
  ],
  providers: [
    InquiryService
  ]
})
export class InquiryModule { }
