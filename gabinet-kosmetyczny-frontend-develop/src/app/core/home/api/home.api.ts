import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProductForUse } from "../model/product-for-use.interface";
import { IProductForSell } from "../model/product-for-sell.interface";
import { environment } from "src/environments/environment";
import { IDatabaseAccountAmountInformation } from "../model/database-account-amount-information.interface";
import { IIncomeAmountMonths } from "../model/income-amount-months.interface";
import { IIncomeAmountWorker } from "../model/income-amount-worker.interface";
import { NotificationType } from "src/app/shared/models/enums/notification-type.enum";
import { INotification } from "src/app/shared/models/interface/notification.interface";
import { IMachineReport } from "./../model/machine-report.interface";
import { IReport } from "./../model/report.interface";
import { ITrashesReport } from "./../model/trashes-report.interface";

@Injectable()
export class HomeApi {

    constructor(
        private http: HttpClient
    ) { }

    public retrieveWorkersAmount(): Observable<IDatabaseAccountAmountInformation> {
        return this.http.get<any>(environment.api + "admin/database/information/accounts-amount/workers");
    }

    public retrieveClientsAmount(): Observable<IDatabaseAccountAmountInformation> {
        return this.http.get<any>(environment.api + "admin/database/information/accounts-amount/clients");
    }

    public retrieveVisitsAmount(): Observable<IDatabaseAccountAmountInformation> {
        return this.http.get<any>(environment.api + "admin/database/information/visits-amount");
    }

    public retrieveVisitsInThisMonthAmount(): Observable<IDatabaseAccountAmountInformation> {
        return this.http.get<any>(environment.api + "admin/database/information/visits-amount/current-month");
    }

    public countIncomeFromVisitsThisMonth(): Observable<IIncomeAmountMonths[]> {
        return this.http.get<any>(environment.api + "admin/database/information/income-amount/visits");
    }

    public countIncomePerWorker(): Observable<IIncomeAmountWorker[]> {
        return this.http.get<any>(environment.api + "admin/database/information/income-amount/workers");
    }

    public getAdminSystemNotifications(): Observable<INotification[]> {
        return this.http.get<any>(environment.api + "admin/notification/system-notifications");
    }

    public getAllNotificationsForWorker(accountUuid: string, profileUuid: string, type: NotificationType): Observable<INotification[]> {
        return this.http.post<any>(environment.api + "wroker/notifications", {accountUuid, profileUuid, type});
    }

    public deleteNotification(uuid: string): Observable<void> {
        return this.http.patch<any>(environment.api + "wroker/notifications/remove", {uuid});
    }

    public markAsSeenNotification(uuid: string): Observable<void> {
        return this.http.patch<any>(environment.api + "wroker/notifications/readed", {uuid});
    }

    public getAllProductsForUse(): Observable<IProductForUse[]> {
        return this.http.get<any>(environment.api + "worker/products/for-use");
    }

    public getAllProductsForSell(): Observable<IProductForSell[]> {
        return this.http.get<any>(environment.api + "worker/products/for-sell");
    }

    public getAllTrashesReportsWithUsersName(): Observable<ITrashesReport[]> {
        return this.http.get<any>(environment.api + "admin/reports/trashes-reports");
    }

    public getAllReportsWithUserName(): Observable<IReport[]> {
        return this.http.get<any>(environment.api + "admin/reports");
    }

    public getAllMachineReportsWithUserName(): Observable<IMachineReport[]> {
        return this.http.get<any>(environment.api + "admin/reports/machine-reports");
    }
}
