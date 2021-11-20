import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomicTaskFilterComponent } from './economic-task-filter.component';

describe('EconomicTaskFilterComponent', () => {
  let component: EconomicTaskFilterComponent;
  let fixture: ComponentFixture<EconomicTaskFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EconomicTaskFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomicTaskFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
