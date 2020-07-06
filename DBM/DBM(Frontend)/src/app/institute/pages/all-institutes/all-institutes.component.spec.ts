import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInstitutesComponent } from './all-institutes.component';

describe('AllInstitutesComponent', () => {
  let component: AllInstitutesComponent;
  let fixture: ComponentFixture<AllInstitutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllInstitutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInstitutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
