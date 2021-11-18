import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EditProductSellComponent } from "./edit-product-sell.component";

describe("EditProductSellComponent", () => {
    let component: EditProductSellComponent;
    let fixture: ComponentFixture<EditProductSellComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EditProductSellComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditProductSellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
