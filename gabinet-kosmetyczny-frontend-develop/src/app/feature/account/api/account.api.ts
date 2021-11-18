import { IWorkerHealthCard } from "./../model/worker-health-card.interface";
import { IPaymentInformation } from "./../model/worker-payment-information.interface";
import { IWorkerAccountInfromation } from "./../model/worker-account-information.interface";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class AccountApi {

    constructor(
        private http: HttpClient
    ) { }

    public getAccountData(uuid: string): Observable<IWorkerAccountInfromation> {
        return this.http.get<any>(environment.api + "worker/account/account-info/" + uuid);
    }

    public updateAccountInfo(accountData: IWorkerAccountInfromation): Observable<void> {
        return this.http.patch<any>(environment.api + "worker/account/account-info", accountData);
    }

    public getHealthCardData(uuid: string): Observable<IWorkerHealthCard> {
        return this.http.get<any>(environment.api + "worker/health-card/" + uuid);
    }

    public updateHealthCard(healthCardData: IWorkerHealthCard): Observable<void> {
        return this.http.patch<any>(environment.api + "worker/health-card", healthCardData);
    }

    public getWorkerIncome(uuid: string): Observable<IPaymentInformation> {
        return this.http.get<any>(environment.api + "worker/payment-info/" + uuid);
    }
}
