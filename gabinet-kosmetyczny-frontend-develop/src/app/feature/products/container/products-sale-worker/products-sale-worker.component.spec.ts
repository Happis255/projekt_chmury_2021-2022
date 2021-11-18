import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProductsSaleWorkerComponent } from "./products-sale-worker.component";

describe("ProductsSaleWorkerComponent", () => {
    let component: ProductsSaleWorkerComponent;
    let fixture: ComponentFixture<ProductsSaleWorkerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductsSaleWorkerComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductsSaleWorkerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
