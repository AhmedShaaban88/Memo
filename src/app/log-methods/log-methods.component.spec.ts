import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogMethodsComponent } from './log-methods.component';

describe('LogMethodsComponent', () => {
  let component: LogMethodsComponent;
  let fixture: ComponentFixture<LogMethodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogMethodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
