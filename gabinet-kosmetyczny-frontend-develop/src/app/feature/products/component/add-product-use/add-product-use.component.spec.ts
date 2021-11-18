import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AddProductUseComponent } from "./add-product-use.component";

describe("AddProductUseComponent", () => {
    let component: AddProductUseComponent;
    let fixture: ComponentFixture<AddProductUseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddProductUseComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddProductUseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
