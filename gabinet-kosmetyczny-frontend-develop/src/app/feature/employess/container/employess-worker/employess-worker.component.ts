import { Subscription } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { IWorkerAccountInfromation } from "src/app/feature/account/model/worker-account-information.interface";
import { EmployessFacade } from "../../employess.facade";
import { MatDialog } from "@angular/material/dialog";
import { EmployeeSendMessageModalComponent } from "../../component/employee-send-message-modal/employee-send-message-modal.component";
import { INewWorkerMessage } from "../../model/workers-message.interface";

@Component({
    selector: "app-employess-worker",
    templateUrl: "./employess-worker.component.html",
    styleUrls: ["./employess-worker.component.sass"]
})
export class EmployessWorkerComponent implements OnInit, OnDestroy {

    public workersList: IWorkerAccountInfromation[] = [];
    public workersListSubscription: Subscription;
    public workerModalElementSubscription: Subscription;
    public isDialogClosed = true;

    constructor(
        private _employessFacade: EmployessFacade,
        private _dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this._employessFacade.loadWorkersList();
        this.workersListSubscription = this._employessFacade.getWorkersList$().subscribe((workersList: IWorkerAccountInfromation[]) => {
            this.workersList = workersList;
        });
    }

    ngOnDestroy(): void {
        if (this.workersListSubscription) {
            this.workersListSubscription.unsubscribe();
        }
    }

    public openSendMessage(): void {
        const dialogRef = this._dialog.open(EmployeeSendMessageModalComponent, {
            maxWidth: "35em",
            disableClose: true
        });
        dialogRef.componentInstance.workersList = this.workersList;
        dialogRef.afterClosed().subscribe((message: INewWorkerMessage) => {
            message.uuidFrom = this._employessFacade.getUserData().accountUuid;
            this._employessFacade.sendMessagesToWorkers(message);
        });
    }
}
