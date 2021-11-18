import { IProductRef } from "./../../model/product-ref.model";
import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { IProductPromotion } from "../../model/product-promotion.model";
@Component({
    selector: "app-add-product-promotion-modal",
    templateUrl: "./add-product-promotion-modal.component.html",
    styleUrls: ["./add-product-promotion-modal.component.sass"]
})
export class AddProductPromotionModalComponent implements OnInit {

    @Input()
    public productsRefList: IProductRef[];

    public servicePromotionForm: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<AddProductPromotionModalComponent>
    ) { }

    ngOnInit(): void {
        this.servicePromotionForm = new FormGroup({
            name: new FormControl("", [Validators.required]),
            description: new FormControl(""),
            price: new FormControl("", [Validators.min(0)]),
            precent: new FormControl("", [Validators.min(0)]),
            from: new FormControl("", [Validators.required]),
            to: new FormControl("", [Validators.required]),
            productToAddList: new FormControl("", [Validators.required])
        });
    }

    public sumbit(): void {
        const newPromotion: IProductPromotion = {};
        newPromotion.name = this.servicePromotionForm.value.name;
        newPromotion.description = this.servicePromotionForm.value.description;
        newPromotion.price = this.servicePromotionForm.value.price;
        newPromotion.precent = this.servicePromotionForm.value.precent;
        newPromotion.dateFrom = this.servicePromotionForm.value.from;
        newPromotion.dateTo = this.servicePromotionForm.value.to;
        newPromotion.productList = this.servicePromotionForm.value.productToAddList;
        this._dialogRef.close(newPromotion);
    }
}
