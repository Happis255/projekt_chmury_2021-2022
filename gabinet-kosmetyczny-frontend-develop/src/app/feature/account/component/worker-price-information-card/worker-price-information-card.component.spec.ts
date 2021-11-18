import { ComponentFixture, TestBed } from "@angular/core/testing";
import { WorkerPriceInformationCardComponent } from "./worker-price-information-card.component";

describe("WorkerPriceInformationCardComponent", () => {
    let component: WorkerPriceInformationCardComponent;
    let fixture: ComponentFixture<WorkerPriceInformationCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WorkerPriceInformationCardComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkerPriceInformationCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
