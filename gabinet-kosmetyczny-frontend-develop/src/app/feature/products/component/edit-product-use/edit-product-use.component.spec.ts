import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EditProductUseComponent } from "./edit-product-use.component";

describe("EditProductUseComponent", () => {
    let component: EditProductUseComponent;
    let fixture: ComponentFixture<EditProductUseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EditProductUseComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditProductUseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
