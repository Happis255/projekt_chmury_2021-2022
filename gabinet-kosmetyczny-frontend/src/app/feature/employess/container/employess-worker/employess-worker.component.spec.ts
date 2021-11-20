import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EmployessWorkerComponent } from "./employess-worker.component";

describe("EmployessWorkerComponent", () => {
    let component: EmployessWorkerComponent;
    let fixture: ComponentFixture<EmployessWorkerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployessWorkerComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployessWorkerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
