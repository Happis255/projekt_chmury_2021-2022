import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EmployeeIncomeInformationModalComponent } from "./employee-income-information-modal.component";

describe("EmployeeIncomeInformationModalComponent", () => {
    let component: EmployeeIncomeInformationModalComponent;
    let fixture: ComponentFixture<EmployeeIncomeInformationModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployeeIncomeInformationModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeeIncomeInformationModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
