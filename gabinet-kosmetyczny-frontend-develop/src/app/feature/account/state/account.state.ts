import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IWorkerHealthCard } from "./../model/worker-health-card.interface";
import { IWorkerAccountInfromation } from "./../model/worker-account-information.interface";
import { IPaymentInformation } from "./../model/worker-payment-information.interface";

@Injectable()
export class AccountState {

    private _paymentInformation = new BehaviorSubject<IPaymentInformation>(null);
    private _workerAccountInformation = new BehaviorSubject<IWorkerAccountInfromation>(null);
    private _workerHealthCard = new BehaviorSubject<IWorkerHealthCard>(null);

    public getPaymentInformation$(): Observable<IPaymentInformation> {
        return this._paymentInformation.asObservable();
    }

    public setPaymentInformation(paymentData: IPaymentInformation): void {
        this._paymentInformation.next(paymentData);
    }

    public getWorkerAccountInformation$(): Observable<IWorkerAccountInfromation> {
        return this._workerAccountInformation.asObservable();
    }

    public setWorkerAccountInformation(accountData: IWorkerAccountInfromation): void {
        this._workerAccountInformation.next(accountData);
    }

    public getWorkerHealthCard$(): Observable<IWorkerHealthCard> {
        return this._workerHealthCard.asObservable();
    }

    public setWorkerHealthCard(healthCardData: IWorkerHealthCard): void {
        this._workerHealthCard.next(healthCardData);
    }
}
