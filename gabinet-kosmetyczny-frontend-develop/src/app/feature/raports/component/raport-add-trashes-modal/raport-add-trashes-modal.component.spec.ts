import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RaportAddTrashesModalComponent } from "./raport-add-trashes-modal.component";

describe("RaportAddTrashesModalComponent", () => {
    let component: RaportAddTrashesModalComponent;
    let fixture: ComponentFixture<RaportAddTrashesModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RaportAddTrashesModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RaportAddTrashesModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
