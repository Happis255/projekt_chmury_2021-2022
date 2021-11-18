import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RaportsAddModalComponent } from "./raports-add-modal.component";

describe("RaportsAddModalComponent", () => {
    let component: RaportsAddModalComponent;
    let fixture: ComponentFixture<RaportsAddModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RaportsAddModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RaportsAddModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
