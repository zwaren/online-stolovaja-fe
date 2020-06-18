import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CooktableComponent } from './cooktable.component';

describe('CooktableComponent', () => {
  let component: CooktableComponent;
  let fixture: ComponentFixture<CooktableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CooktableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CooktableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
