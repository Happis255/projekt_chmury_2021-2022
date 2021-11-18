import { IProductForUse } from "./../../../../core/home/model/product-for-use.interface";
import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-edit-product-use",
    templateUrl: "./edit-product-use.component.html",
    styleUrls: ["./edit-product-use.component.sass"]
})
export class EditProductUseComponent implements OnInit {

    @Input()
    public productToEdit: IProductForUse;

    public editProductUseForm: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<EditProductUseComponent>
    ) { }

    ngOnInit(): void {
        this.editProductUseForm = new FormGroup({
            name: new FormControl(this.productToEdit.name, [Validators.required]),
            description: new FormControl(this.productToEdit.description),
            price: new FormControl(this.productToEdit.price, [Validators.required, Validators.min(0)]),
            amount: new FormControl(this.productToEdit.amount, [Validators.required]),
            code: new FormControl(this.productToEdit.code, [Validators.required])
        });
    }

    public sumbit(): void {
        this.productToEdit.name = this.editProductUseForm.value.name;
        this.productToEdit.description = this.editProductUseForm.value.description;
        this.productToEdit.price = this.editProductUseForm.value.price;
        this.productToEdit.amount = this.editProductUseForm.value.amount;
        this.productToEdit.code = this.editProductUseForm.value.code;
        this._dialogRef.close(this.productToEdit);
    }
}
