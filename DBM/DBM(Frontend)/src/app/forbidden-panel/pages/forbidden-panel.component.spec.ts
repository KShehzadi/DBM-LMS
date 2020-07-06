import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbiddenPanelComponent } from './forbidden-panel.component';

describe('ForbiddenPanelComponent', () => {
  let component: ForbiddenPanelComponent;
  let fixture: ComponentFixture<ForbiddenPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForbiddenPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForbiddenPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
