import { Component, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inquiry } from 'src/app/core/models/inquiry';
import { PaginationSettings } from 'src/app/core/models/paginationSettings';
import { InquiryService } from 'src/app/core/services/inquiry.service';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css']
})
export class InquiryComponent {
  inquiries!:Inquiry[]; 
  @Output() pagination!:PaginationSettings;

  constructor(private inquiryService: InquiryService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      //Set the pagination settings for the get request
      this.pagination = {
        pageIndex: Number(params['pageIndex']) || 0,
        pageLength: Number(localStorage.getItem('paginationinquiries')) || 10,
        entityName: "inquiries",
        maxPages: 0
      }

      this.inquiryService.getInquiries(this.pagination.pageIndex, this.pagination.pageLength).subscribe(
        response => {
          const { inquiries, totalCount } = response;
          this.inquiries = inquiries;
          this.pagination.maxPages = Math.ceil(totalCount / this.pagination.pageLength)-1;
        }
      );
    });
  }
}
