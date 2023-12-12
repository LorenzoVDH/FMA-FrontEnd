import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryOverviewComponent } from './inquiry-overview.component';

describe('InquiryOverviewComponent', () => {
  let component: InquiryOverviewComponent;
  let fixture: ComponentFixture<InquiryOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InquiryOverviewComponent]
    });
    fixture = TestBed.createComponent(InquiryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
