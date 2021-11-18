import { IEventsWeek } from "./../model/events-week.interface";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IEventsDateControl } from "../model/events-date-control.interface";

@Injectable()
export class EventsState {
    private _eventsDateControl = new BehaviorSubject<IEventsDateControl>(null);
    private _weekPromotions = new BehaviorSubject<IEventsWeek>({
        mondayEvents: [],
        tuesdayEvents: [],
        wednesdayEvents: [],
        thursdayEvents: [],
        fridayEvents: []
    });

    public setDateController(eventsDateControler: IEventsDateControl): void {
        this._eventsDateControl.next(eventsDateControler);
    }

    public getDateController$(): Observable<IEventsDateControl> {
        return this._eventsDateControl.asObservable();
    }

    public setWeekEvents(weekEvents: IEventsWeek): void {
        this._weekPromotions.next(weekEvents);
    }

    public getWeekEvents$(): Observable<IEventsWeek> {
        return this._weekPromotions.asObservable();
    }
}
