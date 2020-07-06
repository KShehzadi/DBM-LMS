import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoursesComponent } from './add-courses.component';

describe('AddCoursesComponent', () => {
  let component: AddCoursesComponent;
  let fixture: ComponentFixture<AddCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
