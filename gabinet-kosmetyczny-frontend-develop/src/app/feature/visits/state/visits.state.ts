import { IClientDataRef } from "./../../clients/model/client-ref.model";
import { IVisitDateControler } from "./../model/visit-date.form";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IWorkerRef } from "../model/worker-ref.model";
import { ICalendarWorking } from "../model/calendar";
import { IWorkerHourAvaibility } from "../model/worker-hour-avaibility.model";

@Injectable()
export class VisitsState {
    private _dateController = new BehaviorSubject<IVisitDateControler>(null);
    private _workerRefList = new BehaviorSubject<IWorkerRef[]>(null);
    private _clientRefList = new BehaviorSubject<IClientDataRef[]>(null);
    private _workerHourAvaibility = new BehaviorSubject<IWorkerHourAvaibility[]>(null);
    private _weekWorking = new BehaviorSubject<ICalendarWorking>({
        mondayWorkingDay: [],
        tuesdayWorkingDay: [],
        wednesdayWorkingDay: [],
        thursdayWorkingDay: [],
        fridayWorkingDay: []
    });

    public getDateController$(): Observable<IVisitDateControler> {
        return this._dateController.asObservable();
    }

    public setDateController(controller: IVisitDateControler): void {
        this._dateController.next(controller);
    }

    public getWorkerRefList$(): Observable<IWorkerRef[]> {
        return this._workerRefList.asObservable();
    }

    public setWorkerRefList(visitsWorkerRefList: IWorkerRef[]): void {
        this._workerRefList.next(visitsWorkerRefList);
    }

    public getWorkingWeek$(): Observable<ICalendarWorking> {
        return this._weekWorking.asObservable();
    }

    public setWorkingWeek(weekWorking: ICalendarWorking): void {
        this._weekWorking.next(weekWorking);
    }

    public setClientDataRef(clientDataRef: IClientDataRef[]): void {
        this._clientRefList.next(clientDataRef);
    }

    public getClientDataRef(): Observable<IClientDataRef[]> {
        return this._clientRefList.asObservable();
    }

    public setWorkerHourAvaibility(workerHourAvaibility: IWorkerHourAvaibility[]): void {
        this._workerHourAvaibility.next(workerHourAvaibility);
    }

    public getWorkerHourAvaibility(): Observable<IWorkerHourAvaibility[]> {
        return this._workerHourAvaibility.asObservable();
    }
}
