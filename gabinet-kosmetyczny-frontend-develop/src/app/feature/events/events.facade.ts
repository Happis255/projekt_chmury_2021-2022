import { IEvent } from "./model/event.model";
import { IEventsWeek } from "./model/events-week.interface";
import { Observable } from "rxjs";
import { IEventsDateControl } from "./model/events-date-control.interface";
import { EventsState } from "./state/events.state";
import { Injectable } from "@angular/core";
import { EventsApi } from "./api/events.api";
import { AuthFacade } from "src/app/core/auth/auth.facade";

@Injectable()
export class EventsFacade {
    constructor(
        private _eventsState: EventsState,
        private _eventsApi: EventsApi,
        private _authFacade: AuthFacade
    ) { }

    public loadDateController(dateToString: string): void {
        this._eventsApi.getDateController(dateToString).toPromise()
            .then((eventsDateControler: IEventsDateControl) => {
                this._eventsState.setDateController(eventsDateControler);
            });
    }

    public getDateController$(): Observable<IEventsDateControl> {
        return this._eventsState.getDateController$();
    }

    public loadEventsInformation(dateControler: IEventsDateControl): void {
        const promises = [];
        promises.push(this._eventsApi.getEventsFromDate(dateControler.mondayDate).toPromise());
        promises.push(this._eventsApi.getEventsFromDate(dateControler.tuesdayDate).toPromise());
        promises.push(this._eventsApi.getEventsFromDate(dateControler.wednesdayDate).toPromise());
        promises.push(this._eventsApi.getEventsFromDate(dateControler.thursdayDate).toPromise());
        promises.push(this._eventsApi.getEventsFromDate(dateControler.fridayDate).toPromise());
        Promise.all(promises).then((events: IEvent[][]) => {
            const weekEvents: IEventsWeek = {
                mondayEvents: events[0],
                tuesdayEvents: events[1],
                wednesdayEvents: events[2],
                thursdayEvents: events[3],
                fridayEvents: events[4]
            };
            this._eventsState.setWeekEvents(weekEvents);
        });
    }

    public getWeekPromotions$(): Observable<IEventsWeek> {
        return this._eventsState.getWeekEvents$();
    }

    public signOutFromEvent(eventUuid: string): Promise<any> {
        const workerUuid = this._authFacade.getLocalStorageData().userUuid;

        return this._eventsApi.signOutFromEvent(eventUuid, workerUuid).toPromise();
    }
    public signUpForEvent(eventUuid: string): Promise<any>  {
        const workerUuid = this._authFacade.getLocalStorageData().userUuid;

        return this._eventsApi.signUpForEvent(eventUuid, workerUuid).toPromise();
    }

    public removeEvent(eventUuid: string): Promise<any>  {
        return this._eventsApi.removeEvent(eventUuid).toPromise();
    }

    public getWorkerUuid(): string {
        return this._authFacade.getLocalStorageData().userUuid;
    }

    public addNewEvent(newEvent: IEvent): Promise<any>  {
        return this._eventsApi.addNewEvent(newEvent).toPromise();
    }
}
