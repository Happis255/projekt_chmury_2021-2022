import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductPromotionModalComponent } from './edit-product-promotion-modal.component';

describe('EditProductPromotionModalComponent', () => {
  let component: EditProductPromotionModalComponent;
  let fixture: ComponentFixture<EditProductPromotionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductPromotionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductPromotionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
