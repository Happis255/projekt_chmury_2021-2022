import { Router } from '@angular/router';
import { INewWorker } from "./../../model/new-worker.interface";
import { IWorkerHealthCard } from "./../../../account/model/worker-health-card.interface";
import { WorkerCertificationsEditModalComponent } from "./../../../account/component/worker-certifications-edit-modal/worker-certifications-edit-modal.component";
import { Subscription } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { IWorkerAccountInfromation } from "src/app/feature/account/model/worker-account-information.interface";
import { EmployessFacade } from "./../../employess.facade";
import { AccountEditModalComponent } from "src/app/feature/account/component/account-edit-modal/account-edit-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { WorkerHealthCardEditModalComponent } from "src/app/feature/account/component/worker-health-card-edit-modal/worker-health-card-edit-modal.component";
import { EmployessGiveBonusModalComponent } from "../../component/employee-bonus-give-modal/employee-bonus-give-modal";
import { TranslateService } from "@ngx-translate/core";
import { MessageBoxComponent } from "src/app/shared/message-box/component/message-box/message-box.component";
import { EmployeeIncomeInformationModalComponent } from "../../component/employee-income-information-modal/employee-income-information-modal.component";
import { IPaymentInformation } from "src/app/feature/account/model/worker-payment-information.interface";
import { EmployeeAddNewModalComponent } from "../../component/employee-add-new-modal/employee-add-new-modal.component";
import { EmployeeSendMessageModalComponent } from "../../component/employee-send-message-modal/employee-send-message-modal.component";
import { INewWorkerMessage } from "../../model/workers-message.interface";

@Component({
    selector: "app-employess",
    templateUrl: "./employess.component.html",
    styleUrls: ["./employess.component.sass"]
})
export class EmployessComponent implements OnInit, OnDestroy {

    public workersList: IWorkerAccountInfromation[] = [];
    public workersListSubscription: Subscription;
    public workerModalElementSubscription: Subscription;
    public isDialogClosed = true;

    constructor(
        private _employessFacade: EmployessFacade,
        private _dialog: MatDialog,
        private _translate: TranslateService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._employessFacade.loadWorkersList();
        this.workersListSubscription = this._employessFacade.getWorkersList$().subscribe((workersList: IWorkerAccountInfromation[]) => {
            this.workersList = workersList;
        });
        this._checkUrlIfToOpenModal();
    }

    ngOnDestroy(): void {
        if (this.workersListSubscription) {
            this.workersListSubscription.unsubscribe();
        }
    }

    private _checkUrlIfToOpenModal(): void {
        if (this._router.url.includes("add-new")) {
            this.openAddWorker();
        }
    }

    public openAddWorker(): void {
        this._employessFacade.loadWorkersEmailsList();
        this.workerModalElementSubscription = this._employessFacade.getWorkersEmails().subscribe((emails: string[]) => {
            if (emails && this.isDialogClosed) {
                this.isDialogClosed = false;
                const dialogRef = this._dialog.open(EmployeeAddNewModalComponent, {
                    disableClose: true
                });
                dialogRef.componentInstance.emails = emails;
                dialogRef.afterClosed().subscribe((result: INewWorker) => {
                    if (result) {
                        this._employessFacade.hireNewWorker(result);
                        this._employessFacade.loadWorkersList();
                        this._employessFacade.setWorkersEmails(null);
                    }
                    this.isDialogClosed = true;
                    this.workerModalElementSubscription.unsubscribe();
                });
            }
        });
    }

    public openEditWorkerAccountData(worker: IWorkerAccountInfromation): void {
        const dialogRef = this._dialog.open(AccountEditModalComponent, {
            maxWidth: "35em",
            disableClose: true
        });
        dialogRef.componentInstance.accountInformations = worker;
        dialogRef.afterClosed().subscribe((result: IWorkerAccountInfromation) => {
            if (result) {
                this._employessFacade.updateWorkerAccountData(result);
            }
        });
    }

    public openEditWorkerCertifications(worker: IWorkerAccountInfromation): void {
        const dialogRef = this._dialog.open(WorkerCertificationsEditModalComponent, {
            maxWidth: "35em",
            disableClose: true
        });
        dialogRef.componentInstance.certificationListInString = worker.certificates;
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
                if (result == true) {
                    result = "";
                }
                worker.certificates = result;
                this._employessFacade.updateWorkerAccountData(worker);
            }
        });
    }

    public openWorkerHealthBookEdit(worker: IWorkerAccountInfromation): void {
        this._employessFacade.loadWorkerHealthCard(worker.uuid);
        this.workerModalElementSubscription = this._employessFacade.getWorkerHealthCard().subscribe((healthcard: IWorkerHealthCard) => {
            if (healthcard && this.isDialogClosed) {
                this.isDialogClosed = false;
                const dialogRef = this._dialog.open(WorkerHealthCardEditModalComponent, {
                    maxWidth: "35em",
                    disableClose: true
                });
                dialogRef.componentInstance.workerHealthCard = healthcard;
                dialogRef.afterClosed().subscribe((result: IWorkerHealthCard) => {
                    if (result) {
                        this._employessFacade.updateWorkerHealthCard(result);
                    }
                    this.isDialogClosed = true;
                    this._employessFacade.setWorkerHealthCard(null);
                    this.workerModalElementSubscription.unsubscribe();
                });
            }
        });
    }

    public giveWorkerMoneyBonus(worker: IWorkerAccountInfromation): void {
        const dialogRef = this._dialog.open(EmployessGiveBonusModalComponent, {
            maxWidth: "35em",
            disableClose: true
        });
        dialogRef.componentInstance.accountInformations = worker;
        dialogRef.afterClosed().subscribe((result: number) => {
            if (result) {
                this._employessFacade.giveWorkerMoneyBonus(worker.uuid, result);
            }
        });
    }

    public openViewWorkerAccountData($event: Event, worker: IWorkerAccountInfromation): void {
        $event.stopPropagation();
        const dialogRef = this._dialog.open(AccountEditModalComponent, {
            maxWidth: "35em",
            disableClose: true
        });
        dialogRef.componentInstance.accountInformations = worker;
        dialogRef.componentInstance.editMode = false;
    }

    public openViewWorkerCertifications($event: Event, worker: IWorkerAccountInfromation): void {
        $event.stopPropagation();
        const dialogRef = this._dialog.open(WorkerCertificationsEditModalComponent, {
            maxWidth: "35em",
            disableClose: true
        });
        dialogRef.componentInstance.certificationListInString = worker.certificates;
        dialogRef.componentInstance.editMode = false;
    }

    public openWorkerHealthBookView($event: Event, worker: IWorkerAccountInfromation): void {
        $event.stopPropagation();
        this._employessFacade.loadWorkerHealthCard(worker.uuid);
        this.workerModalElementSubscription = this._employessFacade.getWorkerHealthCard().subscribe((healthcard: IWorkerHealthCard) => {
            if (healthcard && this.isDialogClosed) {
                this.isDialogClosed = false;
                const dialogRef = this._dialog.open(WorkerHealthCardEditModalComponent, {
                    maxWidth: "35em",
                    disableClose: true
                });
                dialogRef.componentInstance.workerHealthCard = healthcard;
                dialogRef.componentInstance.editMode = false;
                dialogRef.afterClosed().subscribe(() => {
                    this.isDialogClosed = true;
                    this._employessFacade.setWorkerHealthCard(null);
                    this.workerModalElementSubscription.unsubscribe();
                });
            }
        });
    }

    public viewWorkerMoney($event: Event, worker: IWorkerAccountInfromation): void {
        $event.stopPropagation();
        this._employessFacade.loadWorkerIncomeInformation(worker.uuid);
        this.workerModalElementSubscription = this._employessFacade
            .getWorkerIncomeInformation()
            .subscribe((paymentInformation: IPaymentInformation) => {
                if (paymentInformation && this.isDialogClosed) {
                    this.isDialogClosed = false;
                    const dialogRef = this._dialog.open(EmployeeIncomeInformationModalComponent, {
                        maxWidth: "35em",
                        disableClose: true
                    });
                    dialogRef.componentInstance.paymentInformation = paymentInformation;
                    dialogRef.afterClosed().subscribe(() => {
                        this.isDialogClosed = true;
                        this._employessFacade.setPaymentInformation(null);
                        this.workerModalElementSubscription.unsubscribe();
                    });
                }
            });
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

    public fireWorker(worker: IWorkerAccountInfromation): void {
        const message = this._translate.instant("shared.delete-worker");
        this._dialog.open(MessageBoxComponent, {
            data: {
                message,
                confirmButton: true,
                cancelButton: true
            }
        }).afterClosed().subscribe(result => {
            if (result) {
                this._employessFacade.fireWorker(worker);
            }
        });
    }
}
