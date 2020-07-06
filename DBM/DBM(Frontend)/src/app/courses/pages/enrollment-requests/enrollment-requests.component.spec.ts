import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentRequestsComponent } from './enrollment-requests.component';

describe('EnrollmentRequestsComponent', () => {
  let component: EnrollmentRequestsComponent;
  let fixture: ComponentFixture<EnrollmentRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
