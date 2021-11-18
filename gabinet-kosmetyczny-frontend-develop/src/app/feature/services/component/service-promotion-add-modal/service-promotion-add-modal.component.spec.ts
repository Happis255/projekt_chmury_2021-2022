import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ServicePromotionAddModalComponent } from "./service-promotion-add-modal.component";

describe("ServicePromotionAddModalComponent", () => {
    let component: ServicePromotionAddModalComponent;
    let fixture: ComponentFixture<ServicePromotionAddModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ServicePromotionAddModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ServicePromotionAddModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
