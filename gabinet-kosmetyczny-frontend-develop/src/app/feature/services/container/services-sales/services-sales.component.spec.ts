import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ServicesSalesComponent } from "./services-sales.component";

describe("ServicesSalesComponent", () => {
    let component: ServicesSalesComponent;
    let fixture: ComponentFixture<ServicesSalesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ServicesSalesComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ServicesSalesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
