import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { INotification } from "src/app/shared/models/interface/notification.interface";
import { IUser } from '../../auth/model/user.interface';
import { HomeFacade } from "../home.facade";
import { IIncomeAmountMonths } from "../model/income-amount-months.interface";
import { IIncomeAmountWorker } from "../model/income-amount-worker.interface";
import { IMachineReport } from "../model/machine-report.interface";
import { IProductForSell } from "../model/product-for-sell.interface";
import { IProductForUse } from "../model/product-for-use.interface";
import { IReport } from "../model/report.interface";
import { ITrashesReport } from "../model/trashes-report.interface";

@Component({
    selector: "app-home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.sass"]
})
export class HomePageComponent implements OnInit, OnDestroy {

    public workersAmount: number;
    public clientsAmount: number;
    public visitsAmount: number;
    public visitsThisMonthAmount: number;
    public workersAmountSubscription: Subscription;
    public clientsAmountSubscription: Subscription;
    public visitsAmountSubscription: Subscription;
    public visitsThisMonthAmountSubscription: Subscription;
    public incomeAmountWorkerDataSubscription: Subscription;
    public incomeAmountMonthsDataSubscription: Subscription;
    public AllProductsForUseSubscription: Subscription;
    public AllProductsForSellSubscription: Subscription;
    public incomeAmountWorkerData: IIncomeAmountWorker[];
    public incomeAmountMonthsData: IIncomeAmountMonths[];
    public systemNotificationsSubscription: Subscription;
    public userMessegesSubscription: Subscription;
    public clientsMessegesSubscription: Subscription;
    public systemNotifications: INotification[];
    public userMesseges: INotification[];
    public clientsMesseges: INotification[];
    public productForUse: IProductForUse[];
    public productForSell: IProductForSell[];
    public AllReportsSubscription: Subscription;
    public AllTrashesReportsSubscription: Subscription;
    public AllMachinesReportsSubscription: Subscription;
    public reportsTab: IReport[] = [];
    public trashesReportsTab: ITrashesReport[] = [];
    public machineReportsTab: IMachineReport[] = [];
    public loggedUser: IUser;

    constructor(
        private _homeFacade: HomeFacade
    ) { }

    ngOnInit(): void {
        this._loadData();
        this.loggedUser = this._homeFacade.getLocalUserData();
        this.workersAmountSubscription = this._homeFacade.getWorkersAmount$().subscribe(
            (amount: number) => {
                this.workersAmount = amount;
            }
        );
        this.clientsAmountSubscription = this._homeFacade.getClientsAmount$().subscribe(
            (amount: number) => {
                this.clientsAmount = amount;
            }
        );
        this.visitsAmountSubscription = this._homeFacade.getVisitsAmount$().subscribe(
            (amount: number) => {
                this.visitsAmount = amount;
            }
        );
        this.visitsThisMonthAmountSubscription = this._homeFacade.getVisitsThisMonthAmount$().subscribe(
            (amount: number) => {
                this.visitsThisMonthAmount = amount;
            }
        );
        this.incomeAmountWorkerDataSubscription = this._homeFacade.getIncomePerWorker$().subscribe(
            (incomeData: IIncomeAmountWorker[]) => {
                this.incomeAmountWorkerData = incomeData;
            }
        );
        this.incomeAmountMonthsDataSubscription = this._homeFacade.getIncomeFromVisitsThisMonth$().subscribe(
            (incomeData: IIncomeAmountMonths[]) => {
                this.incomeAmountMonthsData = incomeData;
            }
        );
        if (this.loggedUser.role === "ADMIN") {
            this.systemNotificationsSubscription = this._homeFacade.getSystemNotifications$().subscribe(
                (incomeData: INotification[]) => {
                    this.systemNotifications = incomeData;
                }
            );
        }
        this.userMessegesSubscription = this._homeFacade.getUserMesseges$().subscribe(
            (incomeData: INotification[]) => {
                this.userMesseges = incomeData;
            }
        );
        this.clientsMessegesSubscription = this._homeFacade.getClientsMesseges$().subscribe(
            (incomeData: INotification[]) => {
                this.clientsMesseges = incomeData;
            }
        );
        this.AllProductsForUseSubscription = this._homeFacade.getProductForUse$().subscribe(
            (products: IProductForUse[]) => {
                this.productForUse = products;
            }
        );
        this.AllProductsForSellSubscription = this._homeFacade.getProductForSell$().subscribe(
            (products: IProductForSell[]) => {
                this.productForSell = products;
            }
        );
        this.AllReportsSubscription = this._homeFacade.getReports$().subscribe(
            (reports: IReport[]) => {
                this.reportsTab = reports;
            }
        );
        this.AllTrashesReportsSubscription = this._homeFacade.getTrashesReports$().subscribe(
            (reports: ITrashesReport[]) => {
                this.trashesReportsTab = reports;
            }
        );
        this.AllMachinesReportsSubscription = this._homeFacade.getMachineReports$().subscribe(
            (reports: IMachineReport[]) => {
                this.machineReportsTab = reports;
            }
        );
    }

    public markAsSeen(uuid: string): void {
        this._homeFacade.markAsSeenNotification(uuid).then(() => {
            this._homeFacade.loadAllNotificationsForWorkerFromWorker();
            this._homeFacade.loadAllNotificationsForWorkerFromClient();
            this._homeFacade.loadAdminSystemNotifications();
        });
    }

    public deleteEmitter(uuid: string): void {
        this._homeFacade.deleteNotification(uuid).then(() => {
            this._homeFacade.loadAllNotificationsForWorkerFromWorker();
            this._homeFacade.loadAllNotificationsForWorkerFromClient();
            this._homeFacade.loadAdminSystemNotifications();
        });
    }

    private _loadData(): void {
        this._homeFacade.loadWorkersAmount();
        this._homeFacade.loadClientsAmount();
        this._homeFacade.loadVisitsAmount();
        this._homeFacade.loadVisitsThisMonthAmount();
        this._homeFacade.loadIncomeFromVisitsThisMonth();
        this._homeFacade.loadIncomePerWorker();
        this._homeFacade.loadAllNotificationsForWorkerFromWorker();
        this._homeFacade.loadAllNotificationsForWorkerFromClient();
        this._homeFacade.loadAdminSystemNotifications();
        this._homeFacade.loadAllProductsForUse();
        this._homeFacade.loadAllProductsForSell();
        this._homeFacade.getAllTrashesReportsWithUsersName();
        this._homeFacade.getAllReportsWithUserName();
        this._homeFacade.getAllMachineReportsWithUserName();
    }

    ngOnDestroy(): void {
        if (this.workersAmountSubscription) {
            this.workersAmountSubscription.unsubscribe();
        }
        if (this.clientsAmountSubscription) {
            this.clientsAmountSubscription.unsubscribe();
        }
        if (this.visitsAmountSubscription) {
            this.visitsAmountSubscription.unsubscribe();
        }
        if (this.visitsThisMonthAmountSubscription) {
            this.visitsThisMonthAmountSubscription.unsubscribe();
        }
        if (this.incomeAmountWorkerDataSubscription) {
            this.incomeAmountWorkerDataSubscription.unsubscribe();
        }
        if (this.incomeAmountMonthsDataSubscription) {
            this.incomeAmountMonthsDataSubscription.unsubscribe();
        }
        if (this.userMessegesSubscription) {
            this.userMessegesSubscription.unsubscribe();
        }
        if (this.clientsMessegesSubscription) {
            this.clientsMessegesSubscription.unsubscribe();
        }
        if (this.AllProductsForUseSubscription) {
            this.AllProductsForUseSubscription.unsubscribe();
        }
        if (this.AllProductsForSellSubscription) {
            this.AllProductsForSellSubscription.unsubscribe();
        }
        if (this.AllReportsSubscription) {
            this.AllReportsSubscription.unsubscribe();
        }
        if (this.AllTrashesReportsSubscription) {
            this.AllTrashesReportsSubscription.unsubscribe();
        }
        if (this.AllMachinesReportsSubscription) {
            this.AllMachinesReportsSubscription.unsubscribe();
        }
    }
}
