import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ServiceEditModalComponent } from "./service-edit-modal.component";

describe("ServiceEditModalComponent", () => {
    let component: ServiceEditModalComponent;
    let fixture: ComponentFixture<ServiceEditModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ServiceEditModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ServiceEditModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
