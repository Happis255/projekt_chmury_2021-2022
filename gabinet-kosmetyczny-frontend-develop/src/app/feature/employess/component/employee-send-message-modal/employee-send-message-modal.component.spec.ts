import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EmployeeSendMessageModalComponent } from "./employee-send-message-modal.component";

describe("EmployeeSendMessageModalComponent", () => {
    let component: EmployeeSendMessageModalComponent;
    let fixture: ComponentFixture<EmployeeSendMessageModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployeeSendMessageModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeeSendMessageModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
