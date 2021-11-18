import { IServicePromotion } from "./../../model/service-promotion.model";
import { IServiceRef } from "./../../model/service-ref.model";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-service-promotion-add-modal",
    templateUrl: "./service-promotion-add-modal.component.html",
    styleUrls: ["./service-promotion-add-modal.component.sass"]
})
export class ServicePromotionAddModalComponent implements OnInit {

    @Input()
    public serviceListRef: IServiceRef[];

    public servicePromotionForm: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<ServicePromotionAddModalComponent>
    ) { }

    ngOnInit(): void {
        this.servicePromotionForm = new FormGroup({
            name: new FormControl("", [Validators.required]),
            description: new FormControl(""),
            price: new FormControl("", [Validators.min(0)]),
            precent: new FormControl("", [Validators.min(0)]),
            from: new FormControl("", [Validators.required]),
            to: new FormControl("", [Validators.required]),
            servicesToAddList: new FormControl("", [Validators.required])
        });
    }

    public sumbit(): void {
        const newPromotion: IServicePromotion = {};
        newPromotion.name = this.servicePromotionForm.value.name;
        newPromotion.description = this.servicePromotionForm.value.description;
        newPromotion.price = this.servicePromotionForm.value.price;
        newPromotion.precent = this.servicePromotionForm.value.precent;
        newPromotion.dateFrom = this.servicePromotionForm.value.from;
        newPromotion.dateTo = this.servicePromotionForm.value.to;
        newPromotion.servicesList = this.servicePromotionForm.value.servicesToAddList;
        this._dialogRef.close(newPromotion);
    }
}
