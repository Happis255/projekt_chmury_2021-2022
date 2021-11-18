import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AddNewEquipmentModalComponent } from "./add-new-equipment-modal.component";

describe("AddNewEquipmentModalComponent", () => {
    let component: AddNewEquipmentModalComponent;
    let fixture: ComponentFixture<AddNewEquipmentModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddNewEquipmentModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddNewEquipmentModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
