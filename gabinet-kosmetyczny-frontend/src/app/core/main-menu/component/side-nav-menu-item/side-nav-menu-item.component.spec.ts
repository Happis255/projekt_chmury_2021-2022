import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SideNavMenuItemComponent } from "./side-nav-menu-item.component";

describe("SideNavMenuItemComponent", () => {
    let component: SideNavMenuItemComponent;
    let fixture: ComponentFixture<SideNavMenuItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SideNavMenuItemComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SideNavMenuItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
