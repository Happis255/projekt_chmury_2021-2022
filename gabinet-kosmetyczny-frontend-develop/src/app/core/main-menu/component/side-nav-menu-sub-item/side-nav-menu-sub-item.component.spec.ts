import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SideNavMenuSubItemComponent } from "./side-nav-menu-sub-item.component";

describe("SideNavMenuSubItemComponent", () => {
    let component: SideNavMenuSubItemComponent;
    let fixture: ComponentFixture<SideNavMenuSubItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SideNavMenuSubItemComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SideNavMenuSubItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
