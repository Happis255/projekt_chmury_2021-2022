import { IWorkerTask } from "./../../model/task.interface";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { EmployessFacade } from "../../employess.facade";
import { IWorkerAccountInfromation } from "src/app/feature/account/model/worker-account-information.interface";
import { EconomicTaskModalComponent } from "../../component/economic-task-modal/economic-task-modal.component";
import { MessageBoxComponent } from "src/app/shared/message-box/component/message-box/message-box.component";
import { Router } from '@angular/router';

@Component({
    selector: "app-employess-task",
    templateUrl: "./employess-task.component.html",
    styleUrls: ["./employess-task.component.sass"]
})
export class EmployessTaskComponent implements OnInit, OnDestroy {

    public workersEconomicTaskList: IWorkerTask[] = [];
    public workersEconomicTaskListTemp: IWorkerTask[] = [];
    public workersEconomicTaskListSubscription: Subscription;
    public workersListSubscription: Subscription;
    public isDialogClosed = true;

    constructor(
        private _employessFacade: EmployessFacade,
        private _dialog: MatDialog,
        private _translate: TranslateService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._employessFacade.loadWorkerTaskList();
        this.workersEconomicTaskListSubscription = this._employessFacade.getTaskList()
            .subscribe((workersEconomicTaskList: IWorkerTask[]) => {
                if (workersEconomicTaskList) {
                    this.workersEconomicTaskList = workersEconomicTaskList;
                    this.workersEconomicTaskListTemp = this.workersEconomicTaskList;
                }
            });
        this._checkUrlIfToOpenModal();
    }

    ngOnDestroy(): void {
        if (this.workersEconomicTaskListSubscription) {
            this.workersEconomicTaskListSubscription.unsubscribe();
        }
    }

    private _checkUrlIfToOpenModal(): void {
        if (this._router.url.includes("add-new")) {
            this.addEconomicTask();
        }
    }

    public removeEconomicTask(task: IWorkerTask): void {
        const message = this._translate.instant("shared.delete-economic-task");
        this._dialog.open(MessageBoxComponent, {
            data: {
                message,
                confirmButton: true,
                cancelButton: true
            }
        }).afterClosed().subscribe(result => {
            if (result) {
                this._employessFacade.deleteWorkerTask(task.uuid).then(() => {
                    this._employessFacade.loadWorkerTaskList();
                });
            }
        });
    }

    public sortList(filter: IWorkerTask): void {
        if (filter.title || filter.workerName || filter.workerSurname) {
            this.workersEconomicTaskList = this.workersEconomicTaskListTemp;
            this.workersEconomicTaskList = this.workersEconomicTaskList.filter((task: IWorkerTask) => {
                if (filter.title && filter.workerName && filter.workerSurname) {
                    return task.title.toLowerCase().includes(filter.title.toLowerCase()) &&
                        task.workerName.toLowerCase().includes(filter.workerName.toLowerCase()) &&
                        task.workerSurname.toLowerCase().includes(filter.workerSurname.toLowerCase());
                }
                if (filter.title && filter.workerName) {
                    return task.title.toLowerCase().includes(filter.title.toLowerCase()) &&
                        task.workerName.toLowerCase().includes(filter.workerName.toLowerCase());
                }
                if (filter.title && filter.workerSurname) {
                    return task.title.toLowerCase().includes(filter.title.toLowerCase()) &&
                        task.workerSurname.toLowerCase().includes(filter.workerSurname.toLowerCase());
                }
                if (filter.workerName && filter.workerSurname) {
                    return task.workerName.toLowerCase().includes(filter.workerName.toLowerCase()) &&
                        task.workerSurname.toLowerCase().includes(filter.workerSurname.toLowerCase());
                }
                if (filter.title) {
                    return (task.title.toLowerCase().includes(filter.title.toLowerCase()));
                }
                if (filter.workerName) {
                    return (task.workerName.toLowerCase().includes(filter.workerName.toLowerCase()));
                }
                if (filter.workerSurname) {
                    return (task.workerSurname.toLowerCase().includes(filter.workerSurname.toLowerCase()));
                }
            });
        } else {
            this._employessFacade.loadWorkerTaskList();
        }
    }

    public addEconomicTask(): void {
        this._employessFacade.loadWorkersList();
        this.workersListSubscription = this._employessFacade.getWorkersList$().subscribe((workersList: IWorkerAccountInfromation[]) => {
            if (workersList && this.isDialogClosed) {
                this.isDialogClosed = false;
                const dialogRef = this._dialog.open(EconomicTaskModalComponent, {
                    disableClose: true
                });
                dialogRef.componentInstance.workersList = workersList;
                dialogRef.componentInstance.editMode = false;
                dialogRef.afterClosed().subscribe((result: IWorkerTask) => {
                    if (result) {
                        this._employessFacade.addWorkerTask(result).then(() => {
                            this._employessFacade.loadWorkerTaskList();
                        });
                    }
                    this.isDialogClosed = true;
                    this._employessFacade.setWorkerList(null);
                    this.workersListSubscription.unsubscribe();
                });
            }
        });
    }

    public editEconomicTask(economicTask: IWorkerTask): void {
        this._employessFacade.loadWorkersList();
        this.workersListSubscription = this._employessFacade.getWorkersList$().subscribe((workersList: IWorkerAccountInfromation[]) => {
            if (workersList && this.isDialogClosed) {
                this.isDialogClosed = false;
                const dialogRef = this._dialog.open(EconomicTaskModalComponent, {
                    disableClose: true
                });
                dialogRef.componentInstance.workersList = workersList;
                dialogRef.componentInstance.economicTask = economicTask;
                dialogRef.afterClosed().subscribe((result: IWorkerTask) => {
                    if (result) {
                        this._employessFacade.modifyWorkerTask(result).then(() => {
                            this._employessFacade.loadWorkerTaskList();
                        });
                    }
                    this.isDialogClosed = true;
                    this._employessFacade.setWorkerList(null);
                    this.workersListSubscription.unsubscribe();
                });
            }
        });
    }
}
