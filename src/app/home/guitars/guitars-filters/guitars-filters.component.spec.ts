import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarsFiltersComponent } from './guitars-filters.component';

describe('GuitarsFiltersComponent', () => {
  let component: GuitarsFiltersComponent;
  let fixture: ComponentFixture<GuitarsFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuitarsFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuitarsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
