import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignemntsComponent } from './assignemnts.component';

describe('AssignemntsComponent', () => {
  let component: AssignemntsComponent;
  let fixture: ComponentFixture<AssignemntsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignemntsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignemntsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
