import { IWorkerTask } from "./../model/task.interface";
import { IWorkerAccountInfromation } from "./../../account/model/worker-account-information.interface";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IDateAbsenceForm } from "../model/date-absence-form.interface";
import { IWeekAbsences } from "../model/week-absences.interface";

@Injectable()
export class EmployessState {
    private _workersList = new BehaviorSubject<IWorkerAccountInfromation[]>(null);
    private _workersEmails = new BehaviorSubject<string[]>(null);
    private _workersTaskList = new BehaviorSubject<IWorkerTask[]>(null);
    private _dateController = new BehaviorSubject<IDateAbsenceForm>(null);
    private _weekAbsences = new BehaviorSubject<IWeekAbsences>({
        mondayAbsences: [],
        tuesdayAbsences: [],
        wednesdayAbsences: [],
        thursdayAbsences: [],
        fridayAbsences: []
    });

    public getWorkersList$(): Observable<IWorkerAccountInfromation[]> {
        return this._workersList.asObservable();
    }

    public setWorkersList(workrsList: IWorkerAccountInfromation[]): void {
        this._workersList.next(workrsList);
    }

    public getWorkersEmails$(): Observable<string[]> {
        return this._workersEmails.asObservable();
    }

    public setWorkersEmails(emails: string[]): void {
        this._workersEmails.next(emails);
    }

    public getWorkersTasks$(): Observable<IWorkerTask[]> {
        return this._workersTaskList.asObservable();
    }

    public setWorkersTasks(tasks: IWorkerTask[]): void {
        this._workersTaskList.next(tasks);
    }

    public getDateController$(): Observable<IDateAbsenceForm> {
        return this._dateController.asObservable();
    }

    public setDateController(controller: IDateAbsenceForm): void {
        this._dateController.next(controller);
    }

    public getWeekAbsences$(): Observable<IWeekAbsences> {
        return this._weekAbsences.asObservable();
    }

    public setWeekAbsences(weekAbsences: IWeekAbsences): void {
        this._weekAbsences.next(weekAbsences);
    }
}
