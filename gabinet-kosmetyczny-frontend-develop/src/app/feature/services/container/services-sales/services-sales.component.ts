import { ServicePromotionViewModalComponent } from "./../../component/service-promotion-view-modal/service-promotion-view-modal.component";
import { ServicePromotionEditModalComponent } from "./../../component/service-promotion-edit-modal/service-promotion-edit-modal.component";
import { IServiceRef } from "./../../model/service-ref.model";
import { ServicesFacade } from "./../../services.facade";
import { IServicePromotion } from "./../../model/service-promotion.model";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { MessageBoxComponent } from "src/app/shared/message-box/component/message-box/message-box.component";
import { IServicepromotionDateControl } from "../../model/service-promotion-date.form";
import { IServicePromotionWeek } from "../../model/week-promotions.interface";
import { ServicePromotionAddModalComponent } from "../../component/service-promotion-add-modal/service-promotion-add-modal.component";

@Component({
    selector: "app-services-sales",
    templateUrl: "./services-sales.component.html",
    styleUrls: ["./services-sales.component.sass"]
})
export class ServicesSalesComponent implements OnInit, OnDestroy {

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
        private _dialog: MatDialog,
        private _servicesFacade: ServicesFacade,
        private _translate: TranslateService,
        private _router: Router
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
        this._checkUrlIfToOpenModal();
    }

    ngOnDestroy(): void {
        if (this.dateControllerSubscription) {
            this.dateControllerSubscription.unsubscribe();
        }
    }

    private _checkUrlIfToOpenModal(): void {
        if (this._router.url.includes("add-new")) {
            this.openAddPromotion();
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

    public openEditPromotion(promotion: IServicePromotion): void {
        const dialogRef = this._dialog.open(ServicePromotionEditModalComponent, {
            maxWidth: "35em",
            disableClose: true
        });
        dialogRef.componentInstance.promotion = promotion;
        this._servicesFacade.loadServiceListRef();
        this.servicesRefListSubscription = this._servicesFacade
        .getServicesListRef$()
        .subscribe((serviceListRef: IServiceRef[]) => {
            dialogRef.componentInstance.serviceListRef = serviceListRef;
        });
        dialogRef.afterClosed().subscribe((editedPromotion: IServicePromotion) => {
            if (editedPromotion) {
                this._servicesFacade.editPromotion(editedPromotion).then(() =>
                    this._servicesFacade.loadDateController(this.generateDate(this.dateFormControl.value))
                );
                this.selected = "";
            }
            this.servicesRefListSubscription.unsubscribe();
        });
    }

    public openViewPromotion(promotion: IServicePromotion): void {
        const dialogRef = this._dialog.open(ServicePromotionViewModalComponent, {
            maxWidth: "35em",
            disableClose: true
        });
        dialogRef.componentInstance.promotion = promotion;
        this._servicesFacade.loadServiceListRef();
        this.servicesRefListSubscription = this._servicesFacade
        .getServicesListRef$()
        .subscribe((serviceListRef: IServiceRef[]) => {
            dialogRef.componentInstance.serviceListRef = serviceListRef;
        });
        dialogRef.afterClosed().subscribe(() => {
            this.selected = "";
            this.servicesRefListSubscription.unsubscribe();
        });
    }

    public openAddPromotion(): void {
        const dialogRef = this._dialog.open(ServicePromotionAddModalComponent, {
            maxWidth: "35em",
            disableClose: true
        });
        this._servicesFacade.loadServiceListRef();
        this.servicesRefListSubscription = this._servicesFacade
        .getServicesListRef$()
        .subscribe((serviceListRef: IServiceRef[]) => {
            dialogRef.componentInstance.serviceListRef = serviceListRef;
        });
        dialogRef.afterClosed().subscribe((newPromotion: IServicePromotion) => {
            if (newPromotion) {
                this._servicesFacade.addNewPromotion(newPromotion).then(() =>
                    this._servicesFacade.loadDateController(this.generateDate(this.dateFormControl.value))
                );
                this.selected = "";
            }
            this.servicesRefListSubscription.unsubscribe();
        });
    }

    public removePromotion(uuid: string): void {
        const message = this._translate.instant("shared.delete-promotion");
        this._dialog.open(MessageBoxComponent, {
            data: {
                message,
                confirmButton: true,
                cancelButton: true
            }
        }).afterClosed().subscribe(result => {
            if (result) {
                this._servicesFacade.removePromotion(uuid).then(() =>
                    this._servicesFacade.loadDateController(this.generateDate(this.dateFormControl.value))
                );
            }
        });
    }
}
