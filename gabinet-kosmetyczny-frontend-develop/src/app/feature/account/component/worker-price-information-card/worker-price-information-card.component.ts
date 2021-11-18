import { IPaymentInformation } from "../../model/worker-payment-information.interface";
import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-worker-price-information-card",
    templateUrl: "./worker-price-information-card.component.html",
    styleUrls: ["./worker-price-information-card.component.sass"]
})
export class WorkerPriceInformationCardComponent implements OnInit {

    @Input()
    public paymentInformation: IPaymentInformation;

    constructor() { }

    ngOnInit(): void {
    }

}
