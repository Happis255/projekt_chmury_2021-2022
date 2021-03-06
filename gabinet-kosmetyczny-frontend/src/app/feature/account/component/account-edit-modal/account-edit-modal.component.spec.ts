import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AccountEditModalComponent } from "./account-edit-modal.component";

describe("AccountEditModalComponent", () => {
    let component: AccountEditModalComponent;
    let fixture: ComponentFixture<AccountEditModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AccountEditModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountEditModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
