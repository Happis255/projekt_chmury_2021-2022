import { IAbsence } from '../model/absence.interface';
import { IDateAbsenceForm } from '../model/date-absence-form.interface';
import { IWorkerTask } from "../model/task.interface";
import { INewWorker } from "../model/new-worker.interface";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IWorkerAccountInfromation } from "../../account/model/worker-account-information.interface";
import { INewWorkerMessage } from "../model/workers-message.interface";

@Injectable()
export class EmployessApi {

    constructor(
        private http: HttpClient
    ) { }

    public getWorkersInSystem(): Observable<IWorkerAccountInfromation[]> {
        return this.http.get<any>(environment.api + "admin/workers");
    }

    public giveWorkerMoneyBonus(uuid: string, bonus: number): Observable<void> {
        return this.http.put<any>(environment.api + "admin/worker/give-bonus", {uuid, bonus});
    }

    public createNewWorker(newWorker: INewWorker): Observable<void> {
        return this.http.put<any>(environment.api + "admin/worker/create-new", newWorker);
    }

    public fireWorker(worker: IWorkerAccountInfromation): Promise<void> {
        return this.http.delete<any>(environment.api + "admin/worker/fire-worker-out/" + worker.uuid).toPromise();
    }

    public getWorkersEmailList(): Observable<string[]> {
        return this.http.get<any>(environment.api + "admin/accounts/emails");
    }

    public getAllEconomicTasks(): Observable<IWorkerTask[]> {
        return this.http.get<any>(environment.api + "admin/economic-tasks");
    }

    public addEconomicTask(newTask: IWorkerTask): Observable<IWorkerTask> {
        return this.http.put<any>(environment.api + "admin/economic-task", newTask);
    }

    public modifyEconomicTask(editedTask: IWorkerTask): Observable<IWorkerTask> {
        return this.http.patch<any>(environment.api + "admin/economic-task", editedTask);
    }

    public removeEconomicTask(uuid: string): Observable<void> {
        return this.http.delete<any>(environment.api + "admin/economic-task/" + uuid);
    }

    public sendMessagesToWorkers(message: INewWorkerMessage): Observable<void> {
        return this.http.put<any>(environment.api + "admin/send-messages-to-workers", message);
    }

    public getDateController(dateToString: string): Observable<IDateAbsenceForm> {
        return this.http.get<any>(environment.api + "admin/absences/date-controller/" + dateToString);
    }

    public getAbsencesFromDate(date: Date): Observable<IAbsence[]> {
        return this.http.get<any>(environment.api + "admin/absences/" + date);
    }

    public changeAbsenceStatus(uuid: string, status: string): Observable<void> {
        return this.http.patch<any>(environment.api + "admin/absence", {uuid, status});
    }

    public removeAbsence(uuid: string): Observable<void> {
        return this.http.delete<any>(environment.api + "admin/absence/" + uuid);
    }

    public createNewAbsence(absence: IAbsence): Observable<IAbsence>  {
        return this.http.put<any>(environment.api + "admin/absence", absence);
    }
}
