import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NotificationInformationComponent } from "./notification-information.component";

describe("NotificationInformationComponent", () => {
    let component: NotificationInformationComponent;
    let fixture: ComponentFixture<NotificationInformationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NotificationInformationComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationInformationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
