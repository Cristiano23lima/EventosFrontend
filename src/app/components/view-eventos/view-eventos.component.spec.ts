import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventosComponent } from './view-eventos.component';

describe('ViewEventosComponent', () => {
  let component: ViewEventosComponent;
  let fixture: ComponentFixture<ViewEventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
