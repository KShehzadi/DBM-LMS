import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcoursesComponent } from './allcourses.component';

describe('AllcoursesComponent', () => {
  let component: AllcoursesComponent;
  let fixture: ComponentFixture<AllcoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllcoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
