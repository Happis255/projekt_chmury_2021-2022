import { IProductForSell } from "./../../../../core/home/model/product-for-sell.interface";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-add-product-sell",
    templateUrl: "./add-product-sell.component.html",
    styleUrls: ["./add-product-sell.component.sass"]
})
export class AddProductSellComponent implements OnInit {

    public addProductSellForm: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<AddProductSellComponent>
    ) { }

    ngOnInit(): void {
        this.addProductSellForm = new FormGroup({
            name: new FormControl("", [Validators.required]),
            description: new FormControl(""),
            price: new FormControl("", [Validators.required, Validators.min(0)]),
            amount: new FormControl("", [Validators.required])
        });
    }

    public sumbit(): void {
        const newProduct: IProductForSell = {
            name: this.addProductSellForm.value.name,
            description: this.addProductSellForm.value.description,
            price: this.addProductSellForm.value.price,
            amount: this.addProductSellForm.value.amount
        };
        this._dialogRef.close(newProduct);
    }
}
