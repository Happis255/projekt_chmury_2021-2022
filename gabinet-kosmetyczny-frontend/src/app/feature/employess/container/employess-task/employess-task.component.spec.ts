import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EmployessTaskComponent } from "./employess-task.component";

describe("EmployessTaskComponent", () => {
    let component: EmployessTaskComponent;
    let fixture: ComponentFixture<EmployessTaskComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployessTaskComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployessTaskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
