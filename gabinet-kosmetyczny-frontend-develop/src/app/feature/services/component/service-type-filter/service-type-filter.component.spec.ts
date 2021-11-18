import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SerivcesFilterComponent } from "./service-type-filter.component";

describe("SerivcesFilterComponent", () => {
    let component: SerivcesFilterComponent;
    let fixture: ComponentFixture<SerivcesFilterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SerivcesFilterComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SerivcesFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
