import { ComponentFixture, TestBed } from "@angular/core/testing";
import { WorkerHealthCardInformationCardComponent } from "./worker-health-card-information-card.component";

describe("WorkerHealthCardInformationCardComponent", () => {
    let component: WorkerHealthCardInformationCardComponent;
    let fixture: ComponentFixture<WorkerHealthCardInformationCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WorkerHealthCardInformationCardComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkerHealthCardInformationCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
