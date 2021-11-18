import { ServicesFacade } from "../../services.facade";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { IServicepromotionDateControl } from "../../model/service-promotion-date.form";
import { IServicePromotionWeek } from "../../model/week-promotions.interface";

@Component({
    selector: "app-services-sales",
    templateUrl: "./services-sales-worker.component.html",
    styleUrls: ["./services-sales-worker.component.sass"]
})
export class ServicesSalesWorkerComponent implements OnInit, OnDestroy {

    public currentDate: Date = new Date();
    public dateFormControl: FormControl;
    public dateControllerSubscription: Subscription;
    public dateController: IServicepromotionDateControl = {};
    public weekPromotionsServiceSubscription: Subscription;
    public weekPromotionsService: IServicePromotionWeek = {};
    public selected = "";
    public servicesRefListSubscription: Subscription;

    public myFilter = (d: Date | null): boolean => {
        const day = (d || new Date()).getDay();

        return day !== 0 && day !== 6;
    }

    constructor(
        private _servicesFacade: ServicesFacade
    ) { }

    ngOnInit(): void {
        this.dateFormControl = new FormControl(this.currentDate);
        this._servicesFacade.loadDateController(this.generateDate(this.currentDate));
        this.dateControllerSubscription = this._servicesFacade.getDateController$()
            .subscribe((dateControler: IServicepromotionDateControl) => {
                if (dateControler) {
                    this.dateController = dateControler;
                    this._servicesFacade.loadPromotionInformations(dateControler);
                }
            });
        this.dateFormControl.valueChanges.subscribe((changeDate: Date) => {
            if (changeDate) {
                this._servicesFacade.loadDateController(this.generateDate(changeDate));
            }
        });
        this.weekPromotionsServiceSubscription = this._servicesFacade
            .getWeekPromotions$()
            .subscribe((weekPromotionsService: IServicePromotionWeek) => {
                this.weekPromotionsService = weekPromotionsService;
            });
    }

    ngOnDestroy(): void {
        if (this.dateControllerSubscription) {
            this.dateControllerSubscription.unsubscribe();
        }
    }

    public addSevenDays(): void {
        const day = new Date((new Date(this.dateFormControl.value)).getTime() + (60 * 60 * 24 * 1000 * 7));
        this.dateFormControl = new FormControl(day);
        this.dateFormControl.valueChanges.subscribe((changeDate: Date) => {
            if (changeDate) {
                this._servicesFacade.loadDateController(this.generateDate(changeDate));
            }
        });
        this._servicesFacade.loadDateController(this.generateDate(day));
    }

    public removeSevenDays(): void {
        const day = new Date((new Date(this.dateFormControl.value)).getTime() - (60 * 60 * 24 * 1000 * 7));
        this.dateFormControl = new FormControl(day);
        this.dateFormControl.valueChanges.subscribe((changeDate: Date) => {
            if (changeDate) {
                this._servicesFacade.loadDateController(this.generateDate(changeDate));
            }
        });
        this._servicesFacade.loadDateController(this.generateDate(day));
    }

    public generateDate(currentDate: Date): string {
        let month: string;
        if ((1 + currentDate.getMonth()) < 10) {
            month = "" + "0" + (1 + currentDate.getMonth());
        } else {
            month = "" + (1 + currentDate.getMonth());
        }
        let day: string;
        if (currentDate.getDate() < 10) {
            day = "" + "0" + currentDate.getDate();
        } else {
            day = "" + currentDate.getDate();
        }

        return currentDate.getFullYear() + "-" + month + "-" + day;
    }

    public select(uuid: string): void {
        if (this.selected === uuid) {
            this.selected = "";
        } else {
            this.selected = uuid;
        }
    }

    public checkIfNotSelected(uuid: string): boolean {
        if (this.selected === "") {
            return false;
        } else {
            if (this.selected !== uuid) {
                return true;
            } else {
                return false;
            }
        }
    }
}
