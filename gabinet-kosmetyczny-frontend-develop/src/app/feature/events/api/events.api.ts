import { IEvent } from "./../model/event.model";
import { IEventsDateControl } from "./../model/events-date-control.interface";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class EventsApi {
    constructor(
        private http: HttpClient
    ) { }

    public getDateController(dateToString: string): Observable<IEventsDateControl> {
        return this.http.get<any>(environment.api + "worker/events/date-controller/" + dateToString);
    }

    public getEventsFromDate(dateToString: Date): Observable<IEvent[]> {
        return this.http.get<any>(environment.api + "worker/events/" + dateToString);
    }

    public signOutFromEvent(eventUuid: string, workerUuid: string): Observable<any> {
        return this.http.patch<any>(environment.api + "worker/event/remove-worker", { workerUuid, eventUuid });
    }

    public signUpForEvent(eventUuid: string, workerUuid: string): Observable<any> {
        return this.http.patch<any>(environment.api + "worker/event", { workerUuid, eventUuid });
    }

    public removeEvent(eventUuid: string): Observable<any> {
        return this.http.delete<any>(environment.api + "admin/event/" + eventUuid);
    }

    public addNewEvent(newEvent: IEvent): Observable<any> {
        return this.http.post<any>(environment.api + "admin/event", newEvent);
    }
}
