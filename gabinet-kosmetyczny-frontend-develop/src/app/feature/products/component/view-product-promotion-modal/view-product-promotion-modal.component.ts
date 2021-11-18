import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IProductPromotion } from "../../model/product-promotion.model";
import { IProductRef } from "../../model/product-ref.model";

@Component({
  selector: "app-view-product-promotion-modal",
  templateUrl: "./view-product-promotion-modal.component.html",
  styleUrls: ["./view-product-promotion-modal.component.sass"]
})
export class ViewProductPromotionModalComponent implements OnInit {

    @Input()
    public productsRefList: IProductRef[];

    @Input()
    public promotion: IProductPromotion;

    public servicePromotionForm: FormGroup;

    constructor() { }

    ngOnInit(): void {
        this.servicePromotionForm = new FormGroup({
            name: new FormControl({value: this.promotion.name, disabled: true}, [Validators.required]),
            description: new FormControl({value: this.promotion.description, disabled: true}),
            price: new FormControl({value: this.promotion.price, disabled: true}, [Validators.min(0)]),
            precent: new FormControl({value: this.promotion.precent, disabled: true}, [Validators.min(0)]),
            from: new FormControl({value: this.promotion.dateFrom, disabled: true}, [Validators.required]),
            to: new FormControl({value: this.promotion.dateTo, disabled: true}, [Validators.required]),
            productToAddList: new FormControl(this.promotion.productList, [Validators.required])
        });
    }

    public compareObjects(o1: any, o2: any): boolean {
        return o1.uuid === o2.uuid;
    }
}
