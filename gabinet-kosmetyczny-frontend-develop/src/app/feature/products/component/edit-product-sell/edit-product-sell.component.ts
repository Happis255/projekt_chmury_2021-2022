import { IProductForSell } from "./../../../../core/home/model/product-for-sell.interface";
import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-edit-product-sell",
    templateUrl: "./edit-product-sell.component.html",
    styleUrls: ["./edit-product-sell.component.sass"]
})
export class EditProductSellComponent implements OnInit {

    @Input()
    public productToEdit: IProductForSell;

    public editProductSellForm: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<EditProductSellComponent>
    ) { }

    ngOnInit(): void {
        this.editProductSellForm = new FormGroup({
            name: new FormControl(this.productToEdit.name, [Validators.required]),
            description: new FormControl(this.productToEdit.description),
            price: new FormControl(this.productToEdit.price, [Validators.required, Validators.min(0)]),
            amount: new FormControl(this.productToEdit.amount, [Validators.required])
        });
    }

    public sumbit(): void {
        this.productToEdit.name = this.editProductSellForm.value.name;
        this.productToEdit.description = this.editProductSellForm.value.description;
        this.productToEdit.price = this.editProductSellForm.value.price;
        this.productToEdit.amount = this.editProductSellForm.value.amount;
        this._dialogRef.close(this.productToEdit);
    }
}
