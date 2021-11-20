import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ServicesWorkerComponent } from "./services-worker.component";

describe("ServicesWorkerComponent", () => {
    let component: ServicesWorkerComponent;
    let fixture: ComponentFixture<ServicesWorkerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ServicesWorkerComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ServicesWorkerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
