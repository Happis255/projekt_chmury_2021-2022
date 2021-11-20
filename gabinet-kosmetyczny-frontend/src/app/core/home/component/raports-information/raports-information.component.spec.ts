import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RaportsInformationComponent } from "./raports-information.component";

describe("RaportsInformationComponent", () => {
    let component: RaportsInformationComponent;
    let fixture: ComponentFixture<RaportsInformationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RaportsInformationComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RaportsInformationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
