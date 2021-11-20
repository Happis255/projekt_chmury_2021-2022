import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EventsWorkerComponent } from "./events-worker.component";

describe("EventsWorkerComponent", () => {
    let component: EventsWorkerComponent;
    let fixture: ComponentFixture<EventsWorkerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EventsWorkerComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsWorkerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
