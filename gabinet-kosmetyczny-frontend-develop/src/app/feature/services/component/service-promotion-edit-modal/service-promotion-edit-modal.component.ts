import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { IServicePromotion } from "../../model/service-promotion.model";
import { IServiceRef } from "../../model/service-ref.model";
import { ServicePromotionAddModalComponent } from "../service-promotion-add-modal/service-promotion-add-modal.component";

@Component({
    selector: "app-service-promotion-edit-modal",
    templateUrl: "./service-promotion-edit-modal.component.html",
    styleUrls: ["./service-promotion-edit-modal.component.sass"]
})
export class ServicePromotionEditModalComponent implements OnInit {

    @Input()
    public serviceListRef: IServiceRef[];

    @Input()
    public promotion: IServicePromotion;

    public servicePromotionForm: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<ServicePromotionAddModalComponent>
    ) { }

    ngOnInit(): void {
        this.servicePromotionForm = new FormGroup({
            name: new FormControl(this.promotion.name, [Validators.required]),
            description: new FormControl(this.promotion.description),
            price: new FormControl(this.promotion.price, [Validators.min(0)]),
            precent: new FormControl(this.promotion.precent, [Validators.min(0)]),
            from: new FormControl(this.promotion.dateFrom, [Validators.required]),
            to: new FormControl(this.promotion.dateTo, [Validators.required]),
            servicesList: new FormControl(this.promotion.servicesList, [Validators.required])
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
        this.promotion.servicesList = this.servicePromotionForm.value.servicesList;
        this._dialogRef.close(this.promotion);
    }
}
