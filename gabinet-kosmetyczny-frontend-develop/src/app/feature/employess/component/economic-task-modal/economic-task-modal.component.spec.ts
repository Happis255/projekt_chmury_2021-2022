import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EconomicTaskModalComponent } from "./economic-task-modal.component";

describe("EconomicTaskModalComponent", () => {
    let component: EconomicTaskModalComponent;
    let fixture: ComponentFixture<EconomicTaskModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EconomicTaskModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EconomicTaskModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
