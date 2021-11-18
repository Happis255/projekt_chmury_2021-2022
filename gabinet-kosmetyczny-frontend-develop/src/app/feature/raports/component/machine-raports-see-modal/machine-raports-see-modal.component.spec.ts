import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MachineRaportsSeeModalComponent } from "./machine-raports-see-modal.component";

describe("MachineRaportsSeeModalComponent", () => {
    let component: MachineRaportsSeeModalComponent;
    let fixture: ComponentFixture<MachineRaportsSeeModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MachineRaportsSeeModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MachineRaportsSeeModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
