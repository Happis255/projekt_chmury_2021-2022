import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EditEquipmentModalComponent } from "./edit-equipment-modal.component";

describe("EditEquipmentModalComponent", () => {
    let component: EditEquipmentModalComponent;
    let fixture: ComponentFixture<EditEquipmentModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EditEquipmentModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditEquipmentModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
