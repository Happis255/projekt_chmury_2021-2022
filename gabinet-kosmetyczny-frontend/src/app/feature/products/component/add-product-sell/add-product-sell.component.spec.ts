import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AddProductSellComponent } from "./add-product-sell.component";

describe("AddProductSellComponent", () => {
    let component: AddProductSellComponent;
    let fixture: ComponentFixture<AddProductSellComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddProductSellComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddProductSellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
