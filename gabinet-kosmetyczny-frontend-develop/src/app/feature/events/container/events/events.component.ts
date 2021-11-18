import { AddNewEventModalComponent } from './../../component/add-new-event-modal/add-new-event-modal.component';
import { IWorkerRef } from './../../../visits/model/worker-ref.model';
import { ViewWorkerListModalComponent } from "./../../component/view-worker-list-modal/view-worker-list-modal.component";
import { IEvent } from "./../../model/event.model";
import { EventsFacade } from "./../../events.facade";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { IEventsDateControl } from "../../model/events-date-control.interface";
import { IEventsWeek } from "../../model/events-week.interface";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { EVENT_TYPES } from "../../model/enum/event-type.enum";
import { MessageBoxComponent } from "src/app/shared/message-box/component/message-box/message-box.component";

@Component({
    selector: "app-events",
    templateUrl: "./events.component.html",
    styleUrls: ["./events.component.sass"]
})
export class EventsComponent implements OnInit, OnDestroy {

    public currentDate: Date = new Date();
    public dateFormControl: FormControl;
    public dateControllerSubscription: Subscription;
    public dateController: IEventsDateControl = {};
    public weekEventsSubscription: Subscription;
    public weekEvents: IEventsWeek = {};
    public selected = "";
    public productsRefListSubscription: Subscription;

    public myFilter = (d: Date | null): boolean => {
        const day = (d || new Date()).getDay();

        return day !== 0 && day !== 6;
    }

    constructor(
        private _dialog: MatDialog,
        private _eventsFacade: EventsFacade,
        private _translate: TranslateService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.dateFormControl = new FormControl(this.currentDate);
        this._eventsFacade.loadDateController(this.generateDate(this.currentDate));
        this.dateControllerSubscription = this._eventsFacade.getDateController$()
            .subscribe((dateController: IEventsDateControl) => {
                if (dateController) {
                    this.dateController = dateController;
                    this._eventsFacade.loadEventsInformation(dateController);
                }
            });
        this.dateFormControl.valueChanges.subscribe((changeDate: Date) => {
            if (changeDate) {
                this._eventsFacade.loadDateController(this.generateDate(changeDate));
            }
        });
        this.weekEventsSubscription = this._eventsFacade
            .getWeekPromotions$()
            .subscribe((weekEvens: IEventsWeek) => {
                this.weekEvents = weekEvens;
            });
        this._checkUrlIfToOpenModal();
    }

    ngOnDestroy(): void {
        if (this.dateControllerSubscription) {
            this.dateControllerSubscription.unsubscribe();
        }
    }

    private _checkUrlIfToOpenModal(): void {
        if (this._router.url.includes("add-new")) {
            this.openAddNewEvent();
        }
    }

    public addSevenDays(): void {
        const day = new Date((new Date(this.dateFormControl.value)).getTime() + (60 * 60 * 24 * 1000 * 7));
        this.dateFormControl = new FormControl(day);
        this.dateFormControl.valueChanges.subscribe((changeDate: Date) => {
            if (changeDate) {
                this._eventsFacade.loadDateController(this.generateDate(changeDate));
            }
        });
        this._eventsFacade.loadDateController(this.generateDate(day));
    }

    public removeSevenDays(): void {
        const day = new Date((new Date(this.dateFormControl.value)).getTime() - (60 * 60 * 24 * 1000 * 7));
        this.dateFormControl = new FormControl(day);
        this.dateFormControl.valueChanges.subscribe((changeDate: Date) => {
            if (changeDate) {
                this._eventsFacade.loadDateController(this.generateDate(changeDate));
            }
        });
        this._eventsFacade.loadDateController(this.generateDate(day));
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

    public checkIcon(event: IEvent): string {
        if (event.type === EVENT_TYPES.CONGRESS.toString()) {
            return "card_travel";
        }
        if (event.type === EVENT_TYPES.TRAINING.toString()) {
            return "sports_handball";
        } else {
            return "shopping_basket";
        }
    }

    public checkIfTakingPart(event: IEvent): boolean {
        return !!event.workerRefList.find((workerRef: IWorkerRef) => {
            return workerRef.uuid === this._eventsFacade.getWorkerUuid();
        });
    }

    public openAddNewEvent(): void {
        const dialogRef = this._dialog.open(AddNewEventModalComponent, {
            disableClose: true
        });
        dialogRef.afterClosed().subscribe((newEvent: IEvent) => {
            if (newEvent) {
                this._eventsFacade.addNewEvent(newEvent).then(() => {
                    this._eventsFacade.loadEventsInformation(this.dateController);
                });
            }
        });
    }

    public viewWorkersInEvent(event: IEvent): void {
        const dialogRef = this._dialog.open(ViewWorkerListModalComponent, {
            disableClose: true
        });
        dialogRef.componentInstance.event = event;
    }

    public signUpForEvent(eventUuid: string): void {
        this._eventsFacade.signUpForEvent(eventUuid).then(() => {
            this._eventsFacade.loadEventsInformation(this.dateController);
        });
    }

    public signOutFromEvent(eventUuid: string): void {
        this._eventsFacade.signOutFromEvent(eventUuid).then(() => {
            this._eventsFacade.loadEventsInformation(this.dateController);
        });
    }

    public removeEvent(eventUuid: string): void {
        const message = this._translate.instant("shared.delete-event");
        this._dialog.open(MessageBoxComponent, {
            data: {
                message,
                confirmButton: true,
                cancelButton: true
            }
        }).afterClosed().subscribe(result => {
            if (result) {
                this._eventsFacade.removeEvent(eventUuid).then(() => {
                    this._eventsFacade.loadEventsInformation(this.dateController);
                });
            }
        });
    }
}
