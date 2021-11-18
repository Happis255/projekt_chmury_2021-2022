import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AddNewVisitComponent } from "./add-new-visit.component";

describe("AddNewVisitComponent", () => {
    let component: AddNewVisitComponent;
    let fixture: ComponentFixture<AddNewVisitComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddNewVisitComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddNewVisitComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
