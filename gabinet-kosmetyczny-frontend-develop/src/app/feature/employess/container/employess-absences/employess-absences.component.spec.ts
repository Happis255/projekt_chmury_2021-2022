import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EmployessAbsencesComponent } from "./employess-absences.component";

describe("EmployessAbsencesComponent", () => {
    let component: EmployessAbsencesComponent;
    let fixture: ComponentFixture<EmployessAbsencesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployessAbsencesComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployessAbsencesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
