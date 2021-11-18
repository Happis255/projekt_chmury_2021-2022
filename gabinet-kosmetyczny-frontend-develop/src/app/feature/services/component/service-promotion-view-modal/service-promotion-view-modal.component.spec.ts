import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ServicePromotionViewModalComponent } from "./service-promotion-view-modal.component";

describe("ServicePromotionViewModalComponent", () => {
    let component: ServicePromotionViewModalComponent;
    let fixture: ComponentFixture<ServicePromotionViewModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ServicePromotionViewModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ServicePromotionViewModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
