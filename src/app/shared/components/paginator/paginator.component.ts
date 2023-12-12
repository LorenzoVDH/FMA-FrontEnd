import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationSettings } from 'src/app/core/models/paginationSettings';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  
  @Input() pagination!:PaginationSettings;
  //@Output() performGetRequest!:EventEmitter<PaginationSettings>;

  maxInbetweenPages = 10;
  
  constructor(private router:Router){}

  gotoPage(page:number){
    this.pagination.pageIndex = page;
    this.router.navigateByUrl(`/${this.pagination.entityName}?pageIndex=${this.pagination.pageIndex}&pageLength=${this.pagination.pageLength}`);
  }
  
  get inBetweenPageNumbers(): number[] {
    const inBetweenNumbers = [];
    // Maximum number of pages to show on each side
    const inBetweenPages = Math.min(this.maxInbetweenPages, this.maxInbetweenPages/2); 
    let start = Math.max(0, this.pagination.pageIndex - inBetweenPages);
    let end = Math.min(this.pagination.maxPages, this.pagination.pageIndex + inBetweenPages);
    const totalVisiblePages = end - start + 1;
    const remainingPages = 10 - totalVisiblePages;
    if (remainingPages > 0) {
      const pagesToAddStart = Math.min(remainingPages, start);
      const pagesToAddEnd = Math.min(remainingPages - pagesToAddStart, this.pagination.maxPages - end);
      start -= pagesToAddStart;
      end += pagesToAddEnd;
    }
    for (let i = start; i <= end; i++) {
      inBetweenNumbers.push(i);
    }
    return inBetweenNumbers;
  }

  set pageLength(value: number) {
    //This setter activates whenever you pick a new Page Length, so that you don't end up on a non-existent page. 
    localStorage.setItem('pagination'+this.pagination.entityName, value.toString()); 
    this.router.navigateByUrl(`/${this.pagination.entityName}?pageIndex=0&pageLength=${value}`); 
  }

  get pageIndex() {
    return this.pagination.pageIndex;
  }

  get pageLength() {
    return this.pagination.pageLength;
  }
  
  get maxPages() {
    return this.pagination.maxPages;
  }
}
