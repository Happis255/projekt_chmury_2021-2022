import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PermissionsWorkerComponent } from "./permissions-worker.component";

describe("PermissionsWorkerComponent", () => {
    let component: PermissionsWorkerComponent;
    let fixture: ComponentFixture<PermissionsWorkerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PermissionsWorkerComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PermissionsWorkerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
