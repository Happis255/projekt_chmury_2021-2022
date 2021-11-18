import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { INotification } from "src/app/shared/models/interface/notification.interface";
import { IIncomeAmountMonths } from "../model/income-amount-months.interface";
import { IIncomeAmountWorker } from "../model/income-amount-worker.interface";
import { IMachineReport } from "../model/machine-report.interface";
import { IProductForSell } from "../model/product-for-sell.interface";
import { IProductForUse } from "../model/product-for-use.interface";
import { IReport } from "../model/report.interface";
import { ITrashesReport } from "../model/trashes-report.interface";

@Injectable()
export class HomeState {

    private _workersAmount = new BehaviorSubject<number>(0);
    private _clientsAmount = new BehaviorSubject<number>(0);
    private _visitsAmount = new BehaviorSubject<number>(0);
    private _visitsThisMonthAmount = new BehaviorSubject<number>(0);
    private _incomeFromVisitsThisMonth = new BehaviorSubject<IIncomeAmountMonths[]>(null);
    private _incomePerWorker = new BehaviorSubject<IIncomeAmountWorker[]>(null);
    private _systemNotifications = new BehaviorSubject<INotification[]>(null);
    private _userMesseges = new BehaviorSubject<INotification[]>(null);
    private _clientsMesseges = new BehaviorSubject<INotification[]>(null);
    private _productForSell = new BehaviorSubject<IProductForSell[]>(null);
    private _productForUse = new BehaviorSubject<IProductForUse[]>(null);
    private _reportsTab = new BehaviorSubject<IReport[]>(null);
    private _trashesReportsTab = new BehaviorSubject<ITrashesReport[]>(null);
    private _machineReportsTab = new BehaviorSubject<IMachineReport[]>(null);

    public getWorkersAmount$(): Observable<number> {
        return this._workersAmount.asObservable();
    }

    public setWorkersAmount(amount: number): void {
        this._workersAmount.next(amount);
    }

    public getClientsAmount$(): Observable<number> {
        return this._clientsAmount.asObservable();
    }

    public setClientsAmount(amount: number): void {
        this._clientsAmount.next(amount);
    }

    public getVisitsAmount$(): Observable<number> {
        return this._visitsAmount.asObservable();
    }

    public setVisitsAmount(amount: number): void {
        this._visitsAmount.next(amount);
    }

    public getVisitsThisMonthAmount$(): Observable<number> {
        return this._visitsThisMonthAmount.asObservable();
    }

    public setVisitsThisMonthAmount(amount: number): void {
        this._visitsThisMonthAmount.next(amount);
    }

    public setIncomeFromVisitsThisMonth(incomeFromVisitsThisMonth: IIncomeAmountMonths[]): void {
        this._incomeFromVisitsThisMonth.next(incomeFromVisitsThisMonth);
    }

    public getIncomeFromVisitsThisMonth$(): Observable<IIncomeAmountMonths[]> {
        return this._incomeFromVisitsThisMonth.asObservable();
    }

    public setSystemNotifications(systemNotifications: INotification[]): void {
        this._systemNotifications.next(systemNotifications);
    }

    public getSystemNotifications$(): Observable<INotification[]> {
        return this._systemNotifications.asObservable();
    }

    public setUserMesseges(userMesseges: INotification[]): void {
        this._userMesseges.next(userMesseges);
    }

    public getUserMesseges$(): Observable<INotification[]> {
        return this._userMesseges.asObservable();
    }

    public setClientsMesseges(clientsMesseges: INotification[]): void {
        this._clientsMesseges.next(clientsMesseges);
    }

    public getClientsMesseges$(): Observable<INotification[]> {
        return this._clientsMesseges.asObservable();
    }

    public setIncomePerWorker(incomePerWorker: IIncomeAmountWorker[]): void {
        this._incomePerWorker.next(incomePerWorker);
    }

    public getIncomePerWorker$(): Observable<IIncomeAmountWorker[]> {
        return this._incomePerWorker.asObservable();
    }

    public setProductForSell(productForSell: IProductForSell[]): void {
        this._productForSell.next(productForSell);
    }

    public getProductForSell$(): Observable<IProductForSell[]> {
        return this._productForSell.asObservable();
    }

    public setProductForUse(productForUse: IProductForUse[]): void {
        this._productForUse.next(productForUse);
    }

    public getProductForUse$(): Observable<IProductForUse[]> {
        return this._productForUse.asObservable();
    }

    public setReports(reports: IReport[]): void {
        this._reportsTab.next(reports);
    }

    public getReports$(): Observable<IReport[]> {
        return this._reportsTab.asObservable();
    }

    public setTrashesReports(productForUse: ITrashesReport[]): void {
        this._trashesReportsTab.next(productForUse);
    }

    public getTrashesReports$(): Observable<ITrashesReport[]> {
        return this._trashesReportsTab.asObservable();
    }

    public setMachineReports(machineReportsTab: IMachineReport[]): void {
        this._machineReportsTab.next(machineReportsTab);
    }

    public getMachineReports$(): Observable<IMachineReport[]> {
        return this._machineReportsTab.asObservable();
    }
}
