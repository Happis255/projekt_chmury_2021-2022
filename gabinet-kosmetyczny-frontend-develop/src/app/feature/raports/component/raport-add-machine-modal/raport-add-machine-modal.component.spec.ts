import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RaportAddMachineModalComponent } from "./raport-add-machine-modal.component";

describe("RaportAddMachineModalComponent", () => {
    let component: RaportAddMachineModalComponent;
    let fixture: ComponentFixture<RaportAddMachineModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RaportAddMachineModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RaportAddMachineModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
