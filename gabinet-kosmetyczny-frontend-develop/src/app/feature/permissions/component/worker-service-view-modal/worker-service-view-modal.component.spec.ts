import { ComponentFixture, TestBed } from "@angular/core/testing";
import { WorkerServiceViewModalComponent } from "./worker-service-view-modal.component";

describe("WorkerServiceViewModalComponent", () => {
    let component: WorkerServiceViewModalComponent;
    let fixture: ComponentFixture<WorkerServiceViewModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WorkerServiceViewModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkerServiceViewModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
