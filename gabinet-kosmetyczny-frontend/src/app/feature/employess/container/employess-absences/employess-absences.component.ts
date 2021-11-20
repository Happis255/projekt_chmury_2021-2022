import { AbsenceAddModalComponent } from "./../../component/absence-add-modal/absence-add-modal.component";
import { IAbsence } from "./../../model/absence.interface";
import { IWeekAbsences } from "./../../model/week-absences.interface";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { EmployessFacade } from "../../employess.facade";
import { IDateAbsenceForm } from "../../model/date-absence-form.interface";
import { ABSENCE_STATUS } from "../../model/enum/absence-status.enum";
import { MessageBoxComponent } from "src/app/shared/message-box/component/message-box/message-box.component";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { IWorkerAccountInfromation } from "src/app/feature/account/model/worker-account-information.interface";
import { Router } from "@angular/router";

@Component({
    selector: "app-employess-absences",
    templateUrl: "./employess-absences.component.html",
    styleUrls: ["./employess-absences.component.sass"]
})
export class EmployessAbsencesComponent implements OnInit, OnDestroy {

    public currentDate: Date = new Date();
    public dateFormControl: FormControl;
    public dateController: IDateAbsenceForm = {};
    public weekAbsencesSubscription: Subscription;
    public weekAbsences: IWeekAbsences = {};
    public dateControllerSubscription: Subscription;
    public workersListSubscription: Subscription;
    public selected = "";

    public myFilter = (d: Date | null): boolean => {
        const day = (d || new Date()).getDay();

        return day !== 0 && day !== 6;
    }

    constructor(
        private _employeeFacade: EmployessFacade,
        private _dialog: MatDialog,
        private _translate: TranslateService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.dateFormControl = new FormControl(this.currentDate);
        this._employeeFacade.loadDateController(this.generateDate(this.currentDate));
        this.dateControllerSubscription = this._employeeFacade.getDateController$()
            .subscribe((dateControler: IDateAbsenceForm) => {
                if (dateControler) {
                    this.dateController = dateControler;
                    this._employeeFacade.loadAbsencesInformations(dateControler);
                }
            });
        this.dateFormControl.valueChanges.subscribe((changeDate: Date) => {
            if (changeDate) {
                this._employeeFacade.loadDateController(this.generateDate(changeDate));
            }
        });
        this.weekAbsencesSubscription = this._employeeFacade.getWeekAbsences$().subscribe((weekAbsences: IWeekAbsences) => {
            this.weekAbsences = weekAbsences;
        });
        this._checkUrlIfToOpenModal();
    }

    ngOnDestroy(): void {
        if (this.dateControllerSubscription) {
            this.dateControllerSubscription.unsubscribe();
        }
        if (this.weekAbsencesSubscription) {
            this.weekAbsencesSubscription.unsubscribe();
        }
    }

    private _checkUrlIfToOpenModal(): void {
        if (this._router.url.includes("add-new")) {
            this.openAddAbsence();
        }
    }

    public addSevenDays(): void {
        const day = new Date((new Date(this.dateFormControl.value)).getTime() + (60 * 60 * 24 * 1000 * 7));
        this.dateFormControl = new FormControl(day);
        this.dateFormControl.valueChanges.subscribe((changeDate: Date) => {
            if (changeDate) {
                this._employeeFacade.loadDateController(this.generateDate(changeDate));
            }
        });
        this._employeeFacade.loadDateController(this.generateDate(day));
    }

    public removeSevenDays(): void {
        const day = new Date((new Date(this.dateFormControl.value)).getTime() - (60 * 60 * 24 * 1000 * 7));
        this.dateFormControl = new FormControl(day);
        this.dateFormControl.valueChanges.subscribe((changeDate: Date) => {
            if (changeDate) {
                this._employeeFacade.loadDateController(this.generateDate(changeDate));
            }
        });
        this._employeeFacade.loadDateController(this.generateDate(day));
    }

    public generateDate(currentDate: Date): string {
        let month: string;
        if ((1 + currentDate.getMonth()) < 10) {
            month = "" + "0" + (1 + currentDate.getMonth());
        } else {
            month = "" + (1 + currentDate.getMonth());
        }
        let day: string;
        if (currentDate.getDate() < 10) {
            day = "" + "0" + currentDate.getDate();
        } else {
            day = "" + currentDate.getDate();
        }

        return currentDate.getFullYear() + "-" + month + "-" + day;
    }

    public checkIfNew(status: IAbsence): string {
        if (status.status === ABSENCE_STATUS.NOT_CONFIRMED.toString()) {
            return "n";
        } else {
            return null;
        }
    }

    public checkIcon(status: IAbsence): string {
        if (status.status === ABSENCE_STATUS.NOT_CONFIRMED.toString()) {
            return "help_outline";
        }
        if (status.status === ABSENCE_STATUS.CONFIRMED.toString()) {
            return "check";
        } else {
            return "close";
        }
    }

    public changeStatus(uuid: string, status: string): void {
        this._employeeFacade.changeAbsenceStatus(uuid, status).then(() =>
            this._employeeFacade.loadDateController(this.generateDate(this.dateFormControl.value))
        );
    }

    public select(uuid: string): void {
        if (this.selected === uuid) {
            this.selected = "";
        } else {
            this.selected = uuid;
        }
    }

    public checkIfNotSelected(uuid: string): boolean {
        if (this.selected === "") {
            return false;
        } else {
            if (this.selected !== uuid) {
                return true;
            } else {
                return false;
            }
        }
    }

    public openAddAbsence(): void {
        this._employeeFacade.loadWorkersList();
        const dialogRef = this._dialog.open(AbsenceAddModalComponent, {
            maxWidth: "35em",
            disableClose: true
        });
        this.workersListSubscription = this._employeeFacade.getWorkersList$().subscribe((workersList: IWorkerAccountInfromation[]) => {
            dialogRef.componentInstance.workersList = workersList;
        });
        dialogRef.afterClosed().subscribe((newAbsence: IAbsence) => {
            if (newAbsence) {
                this._employeeFacade.addNewAbsence(newAbsence).then(() =>
                    this._employeeFacade.loadDateController(this.generateDate(this.dateFormControl.value))
                );
            }
            this.workersListSubscription.unsubscribe();
        });
    }

    public removeAbsence(uuid: string): void {
        const message = this._translate.instant("shared.delete-absence");
        this._dialog.open(MessageBoxComponent, {
            data: {
                message,
                confirmButton: true,
                cancelButton: true
            }
        }).afterClosed().subscribe(result => {
            if (result) {
                this._employeeFacade.removeAbsence(uuid).then(() =>
                    this._employeeFacade.loadDateController(this.generateDate(this.dateFormControl.value))
                );
            }
        });
    }
}
