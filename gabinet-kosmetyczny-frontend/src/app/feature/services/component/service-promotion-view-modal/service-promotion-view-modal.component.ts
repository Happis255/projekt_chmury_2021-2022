import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { IServicePromotion } from "../../model/service-promotion.model";
import { IServiceRef } from "../../model/service-ref.model";
import { ServicePromotionAddModalComponent } from "../service-promotion-add-modal/service-promotion-add-modal.component";

@Component({
    selector: "app-service-promotion-view-modal",
    templateUrl: "./service-promotion-view-modal.component.html",
    styleUrls: ["./service-promotion-view-modal.component.sass"]
})
export class ServicePromotionViewModalComponent implements OnInit {

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
            name: new FormControl({value: this.promotion.name, disabled: true}, [Validators.required]),
            description: new FormControl({value: this.promotion.description, disabled: true}),
            price: new FormControl({value: this.promotion.price, disabled: true}, [Validators.min(0)]),
            precent: new FormControl({value: this.promotion.precent, disabled: true}, [Validators.min(0)]),
            from: new FormControl({value: this.promotion.dateFrom, disabled: true}, [Validators.required]),
            to: new FormControl({value: this.promotion.dateTo, disabled: true}, [Validators.required]),
            servicesList: new FormControl(this.promotion.servicesList, [Validators.required])
        });
    }

    public compareObjects(o1: any, o2: any): boolean {
        return o1.uuid === o2.uuid;
    }
}
