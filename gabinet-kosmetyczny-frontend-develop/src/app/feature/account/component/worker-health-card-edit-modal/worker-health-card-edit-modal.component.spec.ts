import { ComponentFixture, TestBed } from "@angular/core/testing";
import { WorkerHealthCardEditModalComponent } from "./worker-health-card-edit-modal.component";

describe("WorkerHealthCardEditModalComponent", () => {
    let component: WorkerHealthCardEditModalComponent;
    let fixture: ComponentFixture<WorkerHealthCardEditModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WorkerHealthCardEditModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkerHealthCardEditModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
