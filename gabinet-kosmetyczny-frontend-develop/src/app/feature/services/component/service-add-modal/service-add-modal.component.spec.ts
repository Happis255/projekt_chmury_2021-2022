import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ServiceAddModalComponent } from "./service-add-modal.component";

describe("ServiceAddModalComponent", () => {
    let component: ServiceAddModalComponent;
    let fixture: ComponentFixture<ServiceAddModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ServiceAddModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ServiceAddModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
