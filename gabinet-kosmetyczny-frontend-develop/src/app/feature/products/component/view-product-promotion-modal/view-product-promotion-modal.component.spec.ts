import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ViewProductPromotionModalComponent } from "./view-product-promotion-modal.component";

describe("ViewProductPromotionModalComponent", () => {
    let component: ViewProductPromotionModalComponent;
    let fixture: ComponentFixture<ViewProductPromotionModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ViewProductPromotionModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewProductPromotionModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
