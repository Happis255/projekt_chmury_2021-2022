import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IncomeDashboardInformationComponent } from "./income-dashboard-information.component";

describe("IncomeDashboardInformationComponent", () => {
    let component: IncomeDashboardInformationComponent;
    let fixture: ComponentFixture<IncomeDashboardInformationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IncomeDashboardInformationComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IncomeDashboardInformationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
