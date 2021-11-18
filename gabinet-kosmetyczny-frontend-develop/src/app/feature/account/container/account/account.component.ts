import { AccountFacade } from "./../../account.facade";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { IUser } from "src/app/core/auth/model/user.interface";
import { Subscription } from "rxjs";
import { IWorkerAccountInfromation } from "../../model/worker-account-information.interface";
import { IWorkerHealthCard } from "../../model/worker-health-card.interface";
import { IPaymentInformation } from "../../model/worker-payment-information.interface";

@Component({
    selector: "app-account",
    templateUrl: "./account.component.html",
    styleUrls: ["./account.component.sass"]
})
export class AccountComponent implements OnInit, OnDestroy {

    public paymentInformationSubscription: Subscription;
    public workerAccountInformationSubscription: Subscription;
    public workerHealthCardSubscription: Subscription;
    public paymentInformation: IPaymentInformation;
    public workerAccountInformation: IWorkerAccountInfromation;
    public workerHealthCard: IWorkerHealthCard;

    private _user: IUser;

    constructor(
        private _accountFacade: AccountFacade
    ) { }

    ngOnInit(): void {
        this._user = this._accountFacade.getUserData();
        this._accountFacade.loadPaymentInformation(this._user.userUuid);
        this._accountFacade.loadWorkerAccountInformation(this._user.accountUuid);
        this._accountFacade.loadWorkerHealthCard(this._user.userUuid);
        this.paymentInformationSubscription = this._accountFacade
            .getPaymentInformation$()
            .subscribe((paymentInformation: IPaymentInformation) => {
                this.paymentInformation = paymentInformation;
            });
        this.workerAccountInformationSubscription = this._accountFacade
            .getWorkerAccountInformation$()
            .subscribe((workerAccountInformation: IWorkerAccountInfromation) => {
                this.workerAccountInformation = workerAccountInformation;
            });
        this.workerHealthCardSubscription = this._accountFacade
            .getWorkerHealthCard$()
            .subscribe((workerHealthCard: IWorkerHealthCard) => {
                this.workerHealthCard = workerHealthCard;
            });
    }

    ngOnDestroy(): void {
        if (this.paymentInformationSubscription) {
            this.paymentInformationSubscription.unsubscribe();
        }
        if (this.workerAccountInformationSubscription) {
            this.workerAccountInformationSubscription.unsubscribe();
        }
        if (this.workerHealthCardSubscription) {
            this.workerHealthCardSubscription.unsubscribe();
        }
    }

    public workerHealthCardUpdate(healthCard: IWorkerHealthCard): void {
        this._accountFacade.updateWorkerHealthCard(healthCard).then(() => {
            this._accountFacade.loadWorkerHealthCard(this._user.userUuid);
        });
    }

    public workerAccountInfromationUpdate(workerAccount: IWorkerAccountInfromation): void {
        this._accountFacade.updateWorkerAccountInformation(workerAccount).then(() => {
            this._accountFacade.loadWorkerAccountInformation(this._user.accountUuid);
        });
    }

    public certificatesUpdate(certificates: string): void {
        this.workerAccountInformation.certificates = certificates;
        this._accountFacade.updateWorkerAccountInformation(this.workerAccountInformation).then(() => {
            this._accountFacade.loadWorkerAccountInformation(this._user.accountUuid);
        });
    }
}
