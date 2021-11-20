import { IWorkerAccountInfromation } from "./../../model/worker-account-information.interface";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AccountEditModalComponent } from "../account-edit-modal/account-edit-modal.component";
import { IWorkerHealthCard } from "../../model/worker-health-card.interface";

@Component({
    selector: "app-account-information-card",
    templateUrl: "./account-information-card.component.html",
    styleUrls: ["./account-information-card.component.sass"]
})
export class AccountInformationCardComponent implements OnInit {

    @Input()
    public workerAccountInfromation: IWorkerAccountInfromation;

    @Output()
    public workerAccountInfromationEventEmitter = new EventEmitter<IWorkerAccountInfromation>();

    constructor(
        public _dialog: MatDialog
    ) { }

    ngOnInit(): void {
    }

    public accountDataEditModal(): void {
        const dialogRef = this._dialog.open(AccountEditModalComponent, {
            maxWidth: "35em",
            disableClose: true
        });
        dialogRef.componentInstance.accountInformations = this.workerAccountInfromation;
        dialogRef.afterClosed().subscribe((result: IWorkerHealthCard) => {
            if (result) {
                this.workerAccountInfromationEventEmitter.emit(result);
            }
        });
    }

}
