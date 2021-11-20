import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ServicesSalesWorkerComponent } from "./services-sales-worker.component";

describe("ServicesSalesWorkerComponent", () => {
    let component: ServicesSalesWorkerComponent;
    let fixture: ComponentFixture<ServicesSalesWorkerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ServicesSalesWorkerComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ServicesSalesWorkerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
