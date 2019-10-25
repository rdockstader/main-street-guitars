import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeaturedCardComponent } from './home-featured-card.component';

describe('HomeFeaturedCardComponent', () => {
  let component: HomeFeaturedCardComponent;
  let fixture: ComponentFixture<HomeFeaturedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFeaturedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFeaturedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
