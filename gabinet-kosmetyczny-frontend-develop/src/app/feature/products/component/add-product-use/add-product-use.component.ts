import { IProductForUse } from "./../../../../core/home/model/product-for-use.interface";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-add-product-use",
    templateUrl: "./add-product-use.component.html",
    styleUrls: ["./add-product-use.component.sass"]
})
export class AddProductUseComponent implements OnInit {

    public addProductUseForm: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<AddProductUseComponent>
    ) { }

    ngOnInit(): void {
        this.addProductUseForm = new FormGroup({
            name: new FormControl("", [Validators.required]),
            description: new FormControl(""),
            price: new FormControl("", [Validators.required, Validators.min(0)]),
            amount: new FormControl("", [Validators.required]),
            code: new FormControl("", [Validators.required])
        });
    }

    public sumbit(): void {
        const newProduct: IProductForUse = {
            name: this.addProductUseForm.value.name,
            description: this.addProductUseForm.value.description,
            price: this.addProductUseForm.value.price,
            amount: this.addProductUseForm.value.amount,
            code: this.addProductUseForm.value.code
        };
        this._dialogRef.close(newProduct);
    }
}
