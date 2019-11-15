import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarsHeaderComponent } from './guitars-header.component';

describe('GuitarsHeaderComponent', () => {
  let component: GuitarsHeaderComponent;
  let fixture: ComponentFixture<GuitarsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuitarsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuitarsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
