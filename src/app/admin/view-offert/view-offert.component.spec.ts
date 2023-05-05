import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOffertComponent } from './view-offert.component';

describe('ViewOffertComponent', () => {
  let component: ViewOffertComponent;
  let fixture: ComponentFixture<ViewOffertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOffertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOffertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
