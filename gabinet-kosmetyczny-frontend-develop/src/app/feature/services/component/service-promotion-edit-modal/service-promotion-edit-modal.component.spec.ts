import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ServicePromotionEditModalComponent } from "./service-promotion-edit-modal.component";

describe("ServicePromotionEditModalComponent", () => {
    let component: ServicePromotionEditModalComponent;
    let fixture: ComponentFixture<ServicePromotionEditModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ServicePromotionEditModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ServicePromotionEditModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
