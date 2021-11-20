import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AbsenceAddModalComponent } from "./absence-add-modal.component";

describe("AbsenceAddModalComponent", () => {
    let component: AbsenceAddModalComponent;
    let fixture: ComponentFixture<AbsenceAddModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AbsenceAddModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AbsenceAddModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
