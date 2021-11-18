import { IAbsence } from "./model/absence.interface";
import { IWeekAbsences } from "./model/week-absences.interface";
import { IWorkerTask } from "./model/task.interface";
import { INewWorker } from "./model/new-worker.interface";
import { IWorkerHealthCard } from "./../account/model/worker-health-card.interface";
import { AccountFacade } from "./../account/account.facade";
import { Injectable } from "@angular/core";
import { EmployessApi } from "./api/emplyess.api";
import { EmployessState } from "./state/employess.state";
import { Observable } from "rxjs";
import { IWorkerAccountInfromation } from "./../account/model/worker-account-information.interface";
import { IPaymentInformation } from "../account/model/worker-payment-information.interface";
import { IUser } from "src/app/core/auth/model/user.interface";
import { INewWorkerMessage } from "./model/workers-message.interface";
import { IDateAbsenceForm } from "./model/date-absence-form.interface";

@Injectable()
export class EmployessFacade {

    constructor(
        private _employessState: EmployessState,
        private _employessApi: EmployessApi,
        private _accountFacade: AccountFacade
    ) { }

    public getUserData(): IUser {
        return this._accountFacade.getUserData();
    }

    public loadDateController(dateToString: string): void {
        this._employessApi.getDateController(dateToString).toPromise()
            .then((workersList: IDateAbsenceForm) => {
                this._employessState.setDateController(workersList);
            });
    }

    public sendMessagesToWorkers(message: INewWorkerMessage): void {
        this._employessApi.sendMessagesToWorkers(message).toPromise();
    }

    public loadWorkersList(): void {
        this._employessApi.getWorkersInSystem()
            .toPromise()
            .then((workersList: IWorkerAccountInfromation[]) => {
                this._employessState.setWorkersList(workersList);
            });
    }

    public loadWorkersEmailsList(): void {
        this._employessApi.getWorkersEmailList()
            .toPromise()
            .then((list: string[]) => {
                this._employessState.setWorkersEmails(list);
            });
    }

    public updateWorkerAccountData(workerAccount: IWorkerAccountInfromation): void {
        this._accountFacade.updateWorkerAccountInformation(workerAccount).then(() => {
            this.loadWorkersList();
        });
    }

    public hireNewWorker(newWorker: INewWorker): void {
        this._employessApi.createNewWorker(newWorker).toPromise().then(() => {
            this.loadWorkersList();
        });
    }

    public loadWorkerTaskList(): void {
        this._employessApi.getAllEconomicTasks().toPromise()
            .then((list: IWorkerTask[]) => {
                this._employessState.setWorkersTasks(list);
            });
    }

    public addNewAbsence(absence: IAbsence): Promise<IAbsence> {
        return this._employessApi.createNewAbsence(absence).toPromise();
    }

    public changeAbsenceStatus(uuid: string, status: string): Promise <void> {
        return this._employessApi.changeAbsenceStatus(uuid, status).toPromise();
    }

    public removeAbsence(uuid: string): Promise <void> {
        return this._employessApi.removeAbsence(uuid).toPromise();
    }

    public loadAbsencesInformations(dateControler: IDateAbsenceForm): void {
        const promises = [];
        promises.push(this._employessApi.getAbsencesFromDate(dateControler.mondayDate).toPromise());
        promises.push(this._employessApi.getAbsencesFromDate(dateControler.tuesdayDate).toPromise());
        promises.push(this._employessApi.getAbsencesFromDate(dateControler.wednesdayDate).toPromise());
        promises.push(this._employessApi.getAbsencesFromDate(dateControler.thursdayDate).toPromise());
        promises.push(this._employessApi.getAbsencesFromDate(dateControler.fridayDate).toPromise());
        Promise.all(promises).then((absences: IAbsence[][]) => {
            const weekAbsences: IWeekAbsences = {
                mondayAbsences: absences[0],
                tuesdayAbsences: absences[1],
                wednesdayAbsences: absences[2],
                thursdayAbsences: absences[3],
                fridayAbsences: absences[4]
            };
            this._employessState.setWeekAbsences(weekAbsences);
        });
    }

    public addWorkerTask(task: IWorkerTask): Promise<IWorkerTask> {
        return this._employessApi.addEconomicTask(task).toPromise();
    }

    public modifyWorkerTask(task: IWorkerTask): Promise<IWorkerTask> {
        return this._employessApi.modifyEconomicTask(task).toPromise();
    }

    public deleteWorkerTask(uuid: string): Promise<void> {
        return this._employessApi.removeEconomicTask(uuid).toPromise();
    }

    public giveWorkerMoneyBonus(uuid: string, result: number): void {
        this._employessApi.giveWorkerMoneyBonus(uuid, result).toPromise();
    }

    public loadWorkerHealthCard(workerUuid: string): void {
        this._accountFacade.loadWorkerHealthCard(workerUuid);
    }

    public getWorkerHealthCard(): Observable<IWorkerHealthCard> {
        return this._accountFacade.getWorkerHealthCard$();
    }

    public getTaskList(): Observable<IWorkerTask[]> {
        return this._employessState.getWorkersTasks$();
    }

    public updateWorkerHealthCard(healthcard: IWorkerHealthCard): void {
        this._accountFacade.updateWorkerHealthCard(healthcard);
        this.setWorkerHealthCard(null);
    }

    public setWorkerHealthCard(healthcard: IWorkerHealthCard): void {
        this._accountFacade.setWorkerHealthCard(healthcard);
    }

    public getWorkersList$(): Observable<IWorkerAccountInfromation[]> {
        return this._employessState.getWorkersList$();
    }

    public getDateController$(): Observable<IDateAbsenceForm> {
        return this._employessState.getDateController$();
    }

    public fireWorker(worker: IWorkerAccountInfromation): void {
        this._employessApi.fireWorker(worker).then(() => {
            this.loadWorkersList();
        });
    }

    public loadWorkerIncomeInformation(uuid: string): void {
        this._accountFacade.loadPaymentInformation(uuid);
    }

    public getWorkerIncomeInformation(): Observable<IPaymentInformation> {
        return this._accountFacade.getPaymentInformation$();
    }

    public setPaymentInformation(payment: IPaymentInformation): void {
        this._accountFacade.setPaymentInformation(payment);
    }

    public setWorkerList(workerList: IWorkerAccountInfromation[]): void {
        this._employessState.setWorkersList(workerList);
    }

    public getWorkersEmails(): Observable<string[]> {
        return this._employessState.getWorkersEmails$();
    }

    public setWorkersEmails(emails: string[]): void {
        return this._employessState.setWorkersEmails(emails);
    }

    public getWeekAbsences$(): Observable<IWeekAbsences> {
        return this._employessState.getWeekAbsences$();
    }
}
