import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductPromotionModalComponent } from './add-product-promotion-modal.component';

describe('AddProductPromotionModalComponent', () => {
  let component: AddProductPromotionModalComponent;
  let fixture: ComponentFixture<AddProductPromotionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductPromotionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductPromotionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
