import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ClientSendMessageComponent } from "./client-send-message.component";

describe("ClientSendMessageComponent", () => {
    let component: ClientSendMessageComponent;
    let fixture: ComponentFixture<ClientSendMessageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ClientSendMessageComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ClientSendMessageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
