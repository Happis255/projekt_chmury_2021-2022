import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WorkerServiceEditModalComponent } from "./worker-service-edit-modal.component";

describe("WorkerServiceEditModalComponent", () => {
    let component: WorkerServiceEditModalComponent;
    let fixture: ComponentFixture<WorkerServiceEditModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WorkerServiceEditModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkerServiceEditModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
