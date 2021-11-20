import { IWorkerHealthCard } from "./model/worker-health-card.interface";
import { IPaymentInformation } from "./model/worker-payment-information.interface";
import { IWorkerAccountInfromation } from "./model/worker-account-information.interface";
import { AccountApi } from "./api/account.api";
import { Injectable } from "@angular/core";
import { AccountState } from "./state/account.state";
import { Observable } from "rxjs";
import { AuthFacade } from "src/app/core/auth/auth.facade";
import { IUser } from "src/app/core/auth/model/user.interface";

@Injectable()
export class AccountFacade {

    constructor(
        private _accountState: AccountState,
        private _authFacade: AuthFacade,
        private _accountApi: AccountApi
    ) { }

    public loadWorkerHealthCard(uuid: string): void {
        this._accountApi.getHealthCardData(uuid)
            .toPromise()
            .then((data: IWorkerHealthCard) => {
                this.setWorkerHealthCard(data);
            });
    }

    public loadPaymentInformation(uuid: string): void {
        this._accountApi.getWorkerIncome(uuid)
            .toPromise()
            .then((data: IPaymentInformation) => {
                this.setPaymentInformation(data);
            });
    }

    public loadWorkerAccountInformation(uuid: string): void {
        this._accountApi.getAccountData(uuid)
            .toPromise()
            .then((data: IWorkerAccountInfromation) => {
                this.setWorkerAccountInformation(data);
            });
    }

    public setWorkerAccountInformation(data: IWorkerAccountInfromation): void {
        this._accountState.setWorkerAccountInformation(data);
    }

    public setWorkerHealthCard(data: IWorkerHealthCard): void {
        this._accountState.setWorkerHealthCard(data);
    }

    public setPaymentInformation(data: IPaymentInformation): void {
        this._accountState.setPaymentInformation(data);
    }

    public updateWorkerAccountInformation(data: IWorkerAccountInfromation): Promise<void> {
        return this._accountApi.updateAccountInfo(data).toPromise();
    }

    public updateWorkerHealthCard(data: IWorkerHealthCard): Promise<void> {
        return this._accountApi.updateHealthCard(data).toPromise();
    }

    public getPaymentInformation$(): Observable<IPaymentInformation> {
        return this._accountState.getPaymentInformation$();
    }

    public getWorkerHealthCard$(): Observable<IWorkerHealthCard> {
        return this._accountState.getWorkerHealthCard$();
    }

    public getWorkerAccountInformation$(): Observable<IWorkerAccountInfromation> {
        return this._accountState.getWorkerAccountInformation$();
    }

    public getUserData(): IUser {
        return this._authFacade.getUser();
    }
}
