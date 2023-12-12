import { Injectable } from '@angular/core';
import { Inquiry } from '../models/inquiry';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  private readURL = 'http://127.0.0.1:7150/Read/Inquiry';
  private writeURL = 'http://127.0.0.1:7031/Write/Inquiry';
  private $incomingInquiries!: Observable<[Inquiry[], number]>;  
  private $currentInquiry!:Observable<Inquiry>;

  constructor(private http: HttpClient) { }
  
  private loadInquiriesToStore(pageIndex: number, pageLength: number) {
    let getInquiriesReadURL = this.readURL + "?" + "&pageIndex=" + pageIndex + "&pageLength=" + pageLength;
    this.$incomingInquiries = this.http.get<any>(getInquiriesReadURL);
  }

  getInquiries(pageIndex: number = 0, pageLength: number = 10): Observable<any> {
    this.loadInquiriesToStore(pageIndex, pageLength);
    return this.$incomingInquiries;
  }

  updateInquiry(inquiry: Inquiry): Observable<Inquiry> {
    this.$currentInquiry = this.http.put<Inquiry>(this.writeURL, inquiry);
    return this.$currentInquiry;
  }
}
