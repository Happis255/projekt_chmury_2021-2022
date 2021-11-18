import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EmployessGiveBonusModal } from "./employee-bonus-give-modal";

describe("EmployessGiveBonusModal", () => {
    let component: EmployessGiveBonusModal;
    let fixture: ComponentFixture<EmployessGiveBonusModal>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployessGiveBonusModal]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployessGiveBonusModal);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
