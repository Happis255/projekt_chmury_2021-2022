import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WorkerCertificationsEditModalComponent } from "./worker-certifications-edit-modal.component";

describe("WorkerCertificationsEditModalComponent", () => {
    let component: WorkerCertificationsEditModalComponent;
    let fixture: ComponentFixture<WorkerCertificationsEditModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WorkerCertificationsEditModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkerCertificationsEditModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
