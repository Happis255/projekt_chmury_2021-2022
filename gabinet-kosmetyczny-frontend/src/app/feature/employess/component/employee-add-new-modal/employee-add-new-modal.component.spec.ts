import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EmployeeAddNewModalComponent } from "./employee-add-new-modal.component";

describe("EmployeeAddNewModalComponent", () => {
    let component: EmployeeAddNewModalComponent;
    let fixture: ComponentFixture<EmployeeAddNewModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployeeAddNewModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeeAddNewModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
