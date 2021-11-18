import { AddNewClientComponent } from "./../add-new-client/add-new-client.component";
import { AddNewVisitComponent } from "./../add-new-visit/add-new-visit.component";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { MessageBoxComponent } from "src/app/shared/message-box/component/message-box/message-box.component";
import { ICalendarWorking } from "../../model/calendar";
import { ICalendarElement } from "../../model/calendar-elemen.model";
import { IVisitDateControler } from "../../model/visit-date.form";
import { IWorkerRef } from "../../model/worker-ref.model";
import { VisitsFacade } from "../../visits-facade";
import { Router } from "@angular/router";
import { INewVisitModel } from "../../model/new-visit.model";

@Component({
    selector: "app-visits",
    templateUrl: "./visits.component.html",
    styleUrls: ["./visits.component.sass"]
})
export class VisitsComponent implements OnInit, OnDestroy {

    public currentDate: Date = new Date();
    public dateFormControl: FormControl;
    public workerListControl: FormControl;
    public dateControllerSubscription: Subscription;
    public dateController: IVisitDateControler = {};
    public workerRefListSubscription: Subscription;
    public workingDaysSubscription: Subscription;
    public workerList: IWorkerRef[] = [];
    public selectedWorkerRef: IWorkerRef;
    public selected = "";
    public calendarWorking: ICalendarWorking;
    public canChange = true;

    constructor(
        private _visitFacade: VisitsFacade,
        private _dialog: MatDialog,
        private _translate: TranslateService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.dateFormControl = new FormControl(this.currentDate);
        this.workerListControl = new FormControl();
        this._visitFacade.loadDateController(this.generateDate(this.currentDate));
        this.dateControllerSubscription = this._visitFacade.getDateController$()
            .subscribe((dateControler: IVisitDateControler) => {
                if (dateControler) {
                    this.dateController = dateControler;
                    if (this.selectedWorkerRef) {
                        this._visitFacade.loadWorkerVisits(this.dateController, this.selectedWorkerRef.uuid);
                    }
                }
            });
        this.dateFormControl.valueChanges.subscribe((changeDate: Date) => {
            if (changeDate) {
                this._visitFacade.loadDateController(this.generateDate(changeDate));
            }
        });
        this._visitFacade.loadWorkerRefList();
        this.workerRefListSubscription = this._visitFacade.getWorkerRefList$().subscribe((list: IWorkerRef[]) => {
            this.workerList = list;
        });
        this.workingDaysSubscription = this._visitFacade.getWorkingWeek$().subscribe((calendarWorking: ICalendarWorking) => {
            this.calendarWorking = calendarWorking;
        });
        this._checkUrlIfToOpenModal();
    }

    ngOnDestroy(): void {
        if (this.dateControllerSubscription) {
            this.dateControllerSubscription.unsubscribe();
        }
        if (this.workerRefListSubscription) {
            this.workerRefListSubscription.unsubscribe();
        }
        if (this.workingDaysSubscription) {
            this.workingDaysSubscription.unsubscribe();
        }
    }

    private _checkUrlIfToOpenModal(): void {
        if (this._router.url.includes("add-new")) {
            this.addVisit();
        }
    }

    public loadSelecetedWorker(worker: IWorkerRef): void {
        this.selectedWorkerRef = worker;
        this._visitFacade.loadWorkerVisits(this.dateController, worker.uuid);
    }

    public setStatus(service: ICalendarElement, status: string): void {
        if (this.canChange) {
            this.canChange = false;
            this._visitFacade.setVisitStatus(service.visitUuid, status).then(() => {
                this._visitFacade.loadWorkerVisits(this.dateController, this.selectedWorkerRef.uuid);
                this.canChange = true;
            });
        }
    }

    public removeAppointment(serviceUuid: string): void {
        if (this.canChange) {
            this.canChange = false;
            const message = this._translate.instant("shared.delete-visit");
            this._dialog.open(MessageBoxComponent, {
                data: {
                    message,
                    confirmButton: true,
                    cancelButton: true
                }
            }).afterClosed().subscribe(result => {
                if (result) {
                    this._visitFacade.removeAppointment(serviceUuid).then(() => {
                        this._visitFacade.loadWorkerVisits(this.dateController, this.selectedWorkerRef.uuid);
                        this.canChange = true;
                    });
                }
            });
        }
    }

    public addSevenDays(): void {
        const day = new Date((new Date(this.dateFormControl.value)).getTime() + (60 * 60 * 24 * 1000 * 7));
        this.dateFormControl = new FormControl(day);
        this.dateFormControl.valueChanges.subscribe((changeDate: Date) => {
            if (changeDate) {
                this._visitFacade.loadDateController(this.generateDate(changeDate));
            }
        });
        this._visitFacade.loadDateController(this.generateDate(day));
    }

    public removeSevenDays(): void {
        const day = new Date((new Date(this.dateFormControl.value)).getTime() - (60 * 60 * 24 * 1000 * 7));
        this.dateFormControl = new FormControl(day);
        this.dateFormControl.valueChanges.subscribe((changeDate: Date) => {
            if (changeDate) {
                this._visitFacade.loadDateController(this.generateDate(changeDate));
            }
        });
        this._visitFacade.loadDateController(this.generateDate(day));
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

    public myFilter = (d: Date | null): boolean => {
        const day = (d || new Date()).getDay();

        return day !== 0 && day !== 6;
    }

    public getSatus(status: string): string {
        switch (status) {
            case "TO_ACCEPT": return "radio_button_unchecked"; break;
            case "REJECTED": return "error"; break;
            case "CONFIRMED": return "check_circle"; break;
            case "FINISHED": return "monetization_on"; break;
            case "CANCELLED": return "cancel"; break;
        }
    }

    public getHeight(howMuch: number): string {
        switch (howMuch) {
            case 1: return "12em"; break;
            case 2: return "26em"; break;
            default:
                const insideSize = (howMuch - 2) * 14;
                const fullSize = insideSize + 26;

                return fullSize + "em";
                break;
        }
    }

    public addVisit(): void {
        if (this.canChange) {
            this._dialog.open(AddNewVisitComponent).afterClosed().subscribe((newVisit: INewVisitModel) => {
                if (newVisit) {
                    if (newVisit.isItClient) {
                        this.selectedWorkerRef = this.workerList.find((worker: IWorkerRef) => worker.uuid === newVisit.workerUuid);
                        this.workerListControl.setValue(this.selectedWorkerRef);
                        this._visitFacade.loadDateController(this.generateDate(newVisit.date));
                        this.dateFormControl = new FormControl(newVisit.date);
                        this._visitFacade.addNewVisit(newVisit).then(() =>
                            this._visitFacade.loadWorkerVisits(this.dateController, this.selectedWorkerRef.uuid)
                        );
                    } else {
                        const dialog = this._dialog.open(AddNewClientComponent);
                        dialog.componentInstance.newVisit = newVisit;
                        dialog.afterClosed().subscribe((newVisit: INewVisitModel) => {
                            if (newVisit) {
                                this.selectedWorkerRef = this.workerList.find((worker: IWorkerRef) => worker.uuid === newVisit.workerUuid);
                                this.workerListControl.setValue(this.selectedWorkerRef);
                                this._visitFacade.loadDateController(this.generateDate(newVisit.date));
                                this.dateFormControl = new FormControl(newVisit.date);
                                this._visitFacade.addNewVisit(newVisit).then(() =>
                                    this._visitFacade.loadWorkerVisits(this.dateController, this.selectedWorkerRef.uuid)
                                );
                            }
                        });
                    }
                }
            });
        }
    }
}
