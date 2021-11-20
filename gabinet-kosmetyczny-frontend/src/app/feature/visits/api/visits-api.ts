import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IClientDataRef } from "../../clients/model/client-ref.model";
import { IServicepromotionDateControl } from "../../services/model/service-promotion-date.form";
import { ICalendarElement } from "../model/calendar-elemen.model";
import { INewVisitModel } from "../model/new-visit.model";
import { IWorkerHourAvaibility } from "../model/worker-hour-avaibility.model";
import { IWorkerRef } from "../model/worker-ref.model";

@Injectable()
export class VisitsApi {

    constructor(
        private http: HttpClient
    ) { }

    public getDateController(dateToString: string): Observable<IServicepromotionDateControl> {
        return this.http.get<any>(environment.api + "worker/visits/date-controller/" + dateToString);
    }

    public getWorkerRef(): Observable<IWorkerRef[]> {
        return this.http.get<any>(environment.api + "admin/workers/ref");
    }

    public getWorkerWorkingDay(dateToString: Date, workerUuid: string): Observable<ICalendarElement[]> {
        return this.http.get<any>(environment.api + "worker/appointment/" + workerUuid + "/" + dateToString.toString());
    }

    public setVisitStatus(visitUuid: string, status: string): Observable<any> {
        return this.http.patch<any>(environment.api + "worker/appointment", { visitUuid, status });
    }

    public removeVisit(visitUuid: string): Observable<any> {
        return this.http.delete<any>(environment.api + "worker/appointment/" + visitUuid);
    }

    public getClientsDataRef(): Observable<IClientDataRef[]> {
        return this.http.get<any>(environment.api + "worker/clients/ref");
    }

    public getAvaibleHours(date: Date, serviceUuid: string): Observable<IWorkerHourAvaibility[]> {
        return this.http.post<any>(environment.api + "client/appointments/hours", { date, serviceUuid });
    }

    public addNewVisit(newVisit: INewVisitModel): Observable<any> {
        return this.http.put<any>(environment.api + "worker/appointment", newVisit);
    }
}
