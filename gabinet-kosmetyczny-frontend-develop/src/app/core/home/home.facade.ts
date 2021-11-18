import { NotificationType } from "src/app/shared/models/enums/notification-type.enum";
import { HomeState } from "./state/home.state";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HomeApi } from "./api/home.api";
import { IDatabaseAccountAmountInformation } from "./model/database-account-amount-information.interface";
import { IIncomeAmountMonths } from "./model/income-amount-months.interface";
import { IIncomeAmountWorker } from "./model/income-amount-worker.interface";
import { AuthFacade } from "../auth/auth.facade";
import { INotification } from "src/app/shared/models/interface/notification.interface";
import { IProductForSell } from "./model/product-for-sell.interface";
import { IProductForUse } from "./model/product-for-use.interface";
import { IMachineReport } from "./model/machine-report.interface";
import { IReport } from "./model/report.interface";
import { ITrashesReport } from "./model/trashes-report.interface";
import { IUser } from "../auth/model/user.interface";

@Injectable()
export class HomeFacade {

    constructor(
        private _homeState: HomeState,
        private _homeApi: HomeApi,
        private _authFacade: AuthFacade
    ) { }

    public loadWorkersAmount(): void {
        this._homeApi.retrieveWorkersAmount()
            .toPromise()
            .then((data: IDatabaseAccountAmountInformation) => {
                this._homeState.setWorkersAmount(data.amount);
            });
    }

    public loadClientsAmount(): void {
        this._homeApi.retrieveClientsAmount()
            .toPromise()
            .then((data: IDatabaseAccountAmountInformation) => {
                this._homeState.setClientsAmount(data.amount);
            });
    }

    public loadVisitsAmount(): void {
        this._homeApi.retrieveVisitsAmount()
            .toPromise()
            .then((data: IDatabaseAccountAmountInformation) => {
                this._homeState.setVisitsAmount(data.amount);
            });
    }

    public loadVisitsThisMonthAmount(): void {
        this._homeApi.retrieveVisitsInThisMonthAmount()
            .toPromise()
            .then((data: IDatabaseAccountAmountInformation) => {
                this._homeState.setVisitsThisMonthAmount(data.amount);
            });
    }

    public loadIncomeFromVisitsThisMonth(): void {
        this._homeApi.countIncomeFromVisitsThisMonth()
            .toPromise()
            .then((data: IIncomeAmountMonths[]) => {
                this._homeState.setIncomeFromVisitsThisMonth(data);
            });
    }

    public loadIncomePerWorker(): void {
        this._homeApi.countIncomePerWorker()
            .toPromise()
            .then((data: IIncomeAmountWorker[]) => {
                this._homeState.setIncomePerWorker(data);
            });
    }

    public loadAllNotificationsForWorkerFromWorker(): void {
        this._homeApi.getAllNotificationsForWorker(
            this._authFacade.getUser().accountUuid, this._authFacade.getUser().userUuid, NotificationType.FROM_USER
        ).toPromise()
            .then((notifications: INotification[]) => {
                this._homeState.setUserMesseges(notifications);
            });
    }

    public loadAllNotificationsForWorkerFromClient(): void {
        this._homeApi.getAllNotificationsForWorker(
            this._authFacade.getUser().accountUuid, this._authFacade.getUser().userUuid, NotificationType.FROM_CLIENT
        ).toPromise()
            .then((notifications: INotification[]) => {
                this._homeState.setClientsMesseges(notifications);
            });
    }

    public loadAdminSystemNotifications(): void {
        this._homeApi.getAdminSystemNotifications()
            .toPromise()
            .then((notifications: INotification[]) => {
                this._homeState.setSystemNotifications(notifications);
            });
    }

    public loadAllProductsForUse(): void {
        this._homeApi.getAllProductsForUse()
            .toPromise()
            .then((products: IProductForUse[]) => {
                this._homeState.setProductForUse(products);
            });
    }

    public loadAllProductsForSell(): void {
        this._homeApi.getAllProductsForSell()
            .toPromise()
            .then((products: IProductForSell[]) => {
                this._homeState.setProductForSell(products);
            });
    }

    public getAllTrashesReportsWithUsersName(): void {
        this._homeApi.getAllTrashesReportsWithUsersName()
            .toPromise()
            .then((reports: ITrashesReport[]) => {
                this._homeState.setTrashesReports(reports);
            });
    }

    public getAllReportsWithUserName(): void {
        this._homeApi.getAllReportsWithUserName()
            .toPromise()
            .then((reports: IReport[]) => {
                this._homeState.setReports(reports);
            });
    }

    public getAllMachineReportsWithUserName(): void {
        this._homeApi.getAllMachineReportsWithUserName()
            .toPromise()
            .then((reports: IMachineReport[]) => {
                this._homeState.setMachineReports(reports);
            });
    }

    public markAsSeenNotification(uuid: string): Promise<void> {
        return this._homeApi.markAsSeenNotification(uuid).toPromise();
    }

    public deleteNotification(uuid: string): Promise<void> {
        return this._homeApi.deleteNotification(uuid).toPromise();
    }

    public getWorkersAmount$(): Observable<number> {
        return this._homeState.getWorkersAmount$();
    }

    public getClientsAmount$(): Observable<number> {
        return this._homeState.getClientsAmount$();
    }

    public getVisitsAmount$(): Observable<number> {
        return this._homeState.getVisitsAmount$();
    }

    public getVisitsThisMonthAmount$(): Observable<number> {
        return this._homeState.getVisitsThisMonthAmount$();
    }

    public getIncomeFromVisitsThisMonth$(): Observable<IIncomeAmountMonths[]> {
        return this._homeState.getIncomeFromVisitsThisMonth$();
    }

    public getIncomePerWorker$(): Observable<IIncomeAmountWorker[]> {
        return this._homeState.getIncomePerWorker$();
    }

    public getUserMesseges$(): Observable<INotification[]> {
        return this._homeState.getUserMesseges$();
    }

    public getClientsMesseges$(): Observable<INotification[]> {
        return this._homeState.getClientsMesseges$();
    }

    public getSystemNotifications$(): Observable<INotification[]> {
        return this._homeState.getSystemNotifications$();
    }

    public getProductForSell$(): Observable<IProductForSell[]> {
        return this._homeState.getProductForSell$();
    }

    public getProductForUse$(): Observable<IProductForUse[]> {
        return this._homeState.getProductForUse$();
    }

    public getReports$(): Observable<IReport[]> {
        return this._homeState.getReports$();
    }

    public getTrashesReports$(): Observable<ITrashesReport[]> {
        return this._homeState.getTrashesReports$();
    }

    public getMachineReports$(): Observable<IMachineReport[]> {
        return this._homeState.getMachineReports$();
    }

    public getLocalUserData(): IUser {
        return this._authFacade.getLocalStorageData();
    }
}
