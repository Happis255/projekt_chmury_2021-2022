import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaportsSeeModalComponent } from './raports-see-modal.component';

describe('RaportsSeeModalComponent', () => {
  let component: RaportsSeeModalComponent;
  let fixture: ComponentFixture<RaportsSeeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaportsSeeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaportsSeeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
