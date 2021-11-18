import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { IProductPromotion } from "../../model/product-promotion.model";
import { IProductRef } from "../../model/product-ref.model";
import { AddProductPromotionModalComponent } from "../add-product-promotion-modal/add-product-promotion-modal.component";

@Component({
  selector: "app-edit-product-promotion-modal",
  templateUrl: "./edit-product-promotion-modal.component.html",
  styleUrls: ["./edit-product-promotion-modal.component.sass"]
})
export class EditProductPromotionModalComponent implements OnInit {

    @Input()
    public productsRefList: IProductRef[];

    @Input()
    public promotion: IProductPromotion;

    public servicePromotionForm: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<AddProductPromotionModalComponent>
    ) { }

    ngOnInit(): void {
        this.servicePromotionForm = new FormGroup({
            name: new FormControl(this.promotion.name, [Validators.required]),
            description: new FormControl(this.promotion.description),
            price: new FormControl(this.promotion.price, [Validators.min(0)]),
            precent: new FormControl(this.promotion.precent, [Validators.min(0)]),
            from: new FormControl(this.promotion.dateFrom, [Validators.required]),
            to: new FormControl(this.promotion.dateTo, [Validators.required]),
            productToAddList: new FormControl(this.promotion.productList, [Validators.required])
        });
    }

    public compareObjects(o1: any, o2: any): boolean {
        return o1.uuid === o2.uuid;
    }

    public sumbit(): void {
        this.promotion.name = this.servicePromotionForm.value.name;
        this.promotion.description = this.servicePromotionForm.value.description;
        this.promotion.price = this.servicePromotionForm.value.price;
        this.promotion.precent = this.servicePromotionForm.value.precent;
        this.promotion.dateFrom = this.servicePromotionForm.value.from;
        this.promotion.dateTo = this.servicePromotionForm.value.to;
        this.promotion.productList = this.servicePromotionForm.value.productToAddList;
        this._dialogRef.close(this.promotion);
    }
}
