import { IPaymentInformation } from "./../../../account/model/worker-payment-information.interface";
import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-employee-income-information-modal",
    templateUrl: "./employee-income-information-modal.component.html",
    styleUrls: ["./employee-income-information-modal.component.sass"]
})
export class EmployeeIncomeInformationModalComponent implements OnInit {

    @Input()
    public paymentInformation: IPaymentInformation;

    constructor(
        private _dialogRef: MatDialogRef<EmployeeIncomeInformationModalComponent>
    ) { }

    ngOnInit(): void {
    }

    public sumbit(): void {
        this._dialogRef.close();
    }
}
