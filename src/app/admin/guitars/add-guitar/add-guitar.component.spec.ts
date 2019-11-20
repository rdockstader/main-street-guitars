import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuitarComponent } from './add-guitar.component';

describe('AddGuitarComponent', () => {
  let component: AddGuitarComponent;
  let fixture: ComponentFixture<AddGuitarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGuitarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGuitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
