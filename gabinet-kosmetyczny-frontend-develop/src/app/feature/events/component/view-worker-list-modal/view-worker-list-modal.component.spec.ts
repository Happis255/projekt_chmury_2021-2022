import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ViewWorkerListModalComponent } from "./view-worker-list-modal.component";

describe("ViewWorkerListModalComponent", () => {
    let component: ViewWorkerListModalComponent;
    let fixture: ComponentFixture<ViewWorkerListModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ViewWorkerListModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewWorkerListModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
