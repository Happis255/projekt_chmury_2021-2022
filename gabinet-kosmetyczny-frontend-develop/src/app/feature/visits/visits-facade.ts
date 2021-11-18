import { IClientDataRef } from "./../clients/model/client-ref.model";
import { ServicesFacade } from "./../services/services.facade";
import { VisitsState } from "./state/visits.state";
import { IVisitDateControler } from "./model/visit-date.form";
import { VisitsApi } from "./api/visits-api";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IWorkerRef } from "./model/worker-ref.model";
import { ICalendarElement } from "./model/calendar-elemen.model";
import { ICalendarWorking } from "./model/calendar";
import { IServiceRef } from "./model/service-ref.model";
import { IWorkerHourAvaibility } from "./model/worker-hour-avaibility.model";
import { INewVisitModel } from "./model/new-visit.model";

@Injectable()
export class VisitsFacade {
    constructor(
        private _visitsApi: VisitsApi,
        private _visitsState: VisitsState,
        private _servicesFacade: ServicesFacade
    ) { }

    public loadDateController(dateToString: string): void {
        this._visitsApi.getDateController(dateToString).toPromise()
            .then((visitsDateController: IVisitDateControler) => {
                this._visitsState.setDateController(visitsDateController);
            });
    }

    public getDateController$(): Observable<IVisitDateControler> {
        return this._visitsState.getDateController$();
    }

    public loadWorkerRefList(): void {
        this._visitsApi.getWorkerRef().toPromise()
            .then((visitsWorkerRefList: IWorkerRef[]) => {
                this._visitsState.setWorkerRefList(visitsWorkerRefList);
            });
    }

    public getWorkerRefList$(): Observable<IWorkerRef[]> {
        return this._visitsState.getWorkerRefList$();
    }

    public setVisitStatus(visitUuid: string, status: string): Promise<any> {
        return this._visitsApi.setVisitStatus(visitUuid, status).toPromise();
    }

    public removeAppointment(visitUuid: string): Promise<any> {
        return this._visitsApi.removeVisit(visitUuid).toPromise();
    }

    public loadWorkerVisits(dateControler: IVisitDateControler, workerUuid: string): void {
        const promises = [];
        promises.push(this._visitsApi.getWorkerWorkingDay(dateControler.mondayDate, workerUuid).toPromise());
        promises.push(this._visitsApi.getWorkerWorkingDay(dateControler.tuesdayDate, workerUuid).toPromise());
        promises.push(this._visitsApi.getWorkerWorkingDay(dateControler.wednesdayDate, workerUuid).toPromise());
        promises.push(this._visitsApi.getWorkerWorkingDay(dateControler.thursdayDate, workerUuid).toPromise());
        promises.push(this._visitsApi.getWorkerWorkingDay(dateControler.fridayDate, workerUuid).toPromise());
        Promise.all(promises).then((workingDay: ICalendarElement[][]) => {
            const weekServicePromotions: ICalendarWorking = {
                mondayWorkingDay: workingDay[0],
                tuesdayWorkingDay: workingDay[1],
                wednesdayWorkingDay: workingDay[2],
                thursdayWorkingDay: workingDay[3],
                fridayWorkingDay: workingDay[4]
            };
            this._visitsState.setWorkingWeek(weekServicePromotions);
        });
    }

    public getWorkingWeek$(): Observable<ICalendarWorking> {
        return this._visitsState.getWorkingWeek$();
    }

    public loadServiceRefList(): void {
        this._servicesFacade.loadServiceListRef();
    }

    public getServiceRefList(): Observable<IServiceRef[]> {
        return this._servicesFacade.getServicesListRef$();
    }

    public loadClientRefList(): void {
        this._visitsApi.getClientsDataRef().toPromise()
            .then((clientDataRef: IClientDataRef[]) => {
                this._visitsState.setClientDataRef(clientDataRef);
            });
    }

    public getClientDataRef(): Observable<IClientDataRef[]> {
        return this._visitsState.getClientDataRef();
    }

    public loadWorkerHourAvaibility(date: Date, uuid: string): void {
        this._visitsApi.getAvaibleHours(date, uuid).toPromise()
            .then((list: IWorkerHourAvaibility[]) => {
                this._visitsState.setWorkerHourAvaibility(list);
            });
    }

    public getWorkerHourAvaibility$(): Observable<IWorkerHourAvaibility[]> {
        return this._visitsState.getWorkerHourAvaibility();
    }

    public addNewVisit(newVisit: INewVisitModel): Promise<any> {
        return this._visitsApi.addNewVisit(newVisit).toPromise();
    }
}
