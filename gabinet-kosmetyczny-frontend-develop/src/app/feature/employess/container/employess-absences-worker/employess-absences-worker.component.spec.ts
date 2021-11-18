import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EmployessAbsencesWorkerComponent } from "./employess-absences-worker.component";

describe("EmployessAbsencesWorkerComponent", () => {
    let component: EmployessAbsencesWorkerComponent;
    let fixture: ComponentFixture<EmployessAbsencesWorkerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployessAbsencesWorkerComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployessAbsencesWorkerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
