import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupsComponent } from './add-groups.component';

describe('AddGroupsComponent', () => {
  let component: AddGroupsComponent;
  let fixture: ComponentFixture<AddGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
