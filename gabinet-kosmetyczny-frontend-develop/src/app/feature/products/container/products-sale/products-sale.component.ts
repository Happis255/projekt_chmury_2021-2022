import { AddProductPromotionModalComponent } from './../../component/add-product-promotion-modal/add-product-promotion-modal.component';
import { ViewProductPromotionModalComponent } from './../../component/view-product-promotion-modal/view-product-promotion-modal.component';
import { IProductRef } from './../../model/product-ref.model';
import { EditProductPromotionModalComponent } from './../../component/edit-product-promotion-modal/edit-product-promotion-modal.component';
import { IProductPromotion } from './../../model/product-promotion.model';
import { ProductsFacade } from "./../../products.facade";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { IProductPromotionDateControl } from "../../model/product-promotion-date.form";
import { IProductPromotionWeek } from "../../model/week-promotions.interface";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { MessageBoxComponent } from 'src/app/shared/message-box/component/message-box/message-box.component';

@Component({
    selector: "app-products-sale",
    templateUrl: "./products-sale.component.html",
    styleUrls: ["./products-sale.component.sass"]
})
export class ProductsSaleComponent implements OnInit, OnDestroy {

    public currentDate: Date = new Date();
    public dateFormControl: FormControl;
    public dateControllerSubscription: Subscription;
    public dateController: IProductPromotionDateControl = {};
    public weekPromotionsProductSubscription: Subscription;
    public weekPromotionsProduct: IProductPromotionWeek = {};
    public selected = "";
    public productsRefListSubscription: Subscription;

    public myFilter = (d: Date | null): boolean => {
        const day = (d || new Date()).getDay();

        return day !== 0 && day !== 6;
    }

    constructor(
        private _dialog: MatDialog,
        private _productsFacade: ProductsFacade,
        private _translate: TranslateService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.dateFormControl = new FormControl(this.currentDate);
        this._productsFacade.loadDateController(this.generateDate(this.currentDate));
        this.dateControllerSubscription = this._productsFacade.getDateController$()
            .subscribe((dateControler: IProductPromotionDateControl) => {
                if (dateControler) {
                    this.dateController = dateControler;
                    this._productsFacade.loadPromotionInformations(dateControler);
                }
            });
        this.dateFormControl.valueChanges.subscribe((changeDate: Date) => {
            if (changeDate) {
                this._productsFacade.loadDateController(this.generateDate(changeDate));
            }
        });
        this.weekPromotionsProductSubscription = this._productsFacade
            .getWeekPromotions$()
            .subscribe((weekPromotionsService: IProductPromotionWeek) => {
                this.weekPromotionsProduct = weekPromotionsService;
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
                this._productsFacade.loadDateController(this.generateDate(changeDate));
            }
        });
        this._productsFacade.loadDateController(this.generateDate(day));
    }

    public removeSevenDays(): void {
        const day = new Date((new Date(this.dateFormControl.value)).getTime() - (60 * 60 * 24 * 1000 * 7));
        this.dateFormControl = new FormControl(day);
        this.dateFormControl.valueChanges.subscribe((changeDate: Date) => {
            if (changeDate) {
                this._productsFacade.loadDateController(this.generateDate(changeDate));
            }
        });
        this._productsFacade.loadDateController(this.generateDate(day));
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

    public openEditPromotion(promotion: IProductPromotion): void {
        const dialogRef = this._dialog.open(EditProductPromotionModalComponent, {
            maxWidth: "35em",
            disableClose: true
        });
        dialogRef.componentInstance.promotion = promotion;
        this._productsFacade.loadProductListRef();
        this.productsRefListSubscription = this._productsFacade
        .getProductListRef$()
        .subscribe((productsRefList: IProductRef[]) => {
            dialogRef.componentInstance.productsRefList = productsRefList;
        });
        dialogRef.afterClosed().subscribe((editedPromotion: IProductPromotion) => {
            if (editedPromotion) {
                this._productsFacade.editPromotion(editedPromotion).then(() =>
                    this._productsFacade.loadDateController(this.generateDate(this.dateFormControl.value))
                );
                this.selected = "";
            }
            this.productsRefListSubscription.unsubscribe();
        });
    }

    public openViewPromotion(promotion: IProductPromotion): void {
        const dialogRef = this._dialog.open(ViewProductPromotionModalComponent, {
            maxWidth: "35em",
            disableClose: true
        });
        dialogRef.componentInstance.promotion = promotion;
        this._productsFacade.loadProductListRef();
        this.productsRefListSubscription = this._productsFacade
        .getProductListRef$()
        .subscribe((productsRefList: IProductRef[]) => {
            dialogRef.componentInstance.productsRefList = productsRefList;
        });
        dialogRef.afterClosed().subscribe(() => {
            this.selected = "";
            this.productsRefListSubscription.unsubscribe();
        });
    }

    public openAddPromotion(): void {
        const dialogRef = this._dialog.open(AddProductPromotionModalComponent, {
            maxWidth: "35em",
            disableClose: true
        });
        this._productsFacade.loadProductListRef();
        this.productsRefListSubscription = this._productsFacade
        .getProductListRef$()
        .subscribe((productsRefList: IProductRef[]) => {
            dialogRef.componentInstance.productsRefList = productsRefList;
        });
        dialogRef.afterClosed().subscribe((newPromotion: IProductPromotion) => {
            if (newPromotion) {
                this._productsFacade.addNewPromotion(newPromotion).then(() =>
                    this._productsFacade.loadDateController(this.generateDate(this.dateFormControl.value))
                );
                this.selected = "";
            }
            this.productsRefListSubscription.unsubscribe();
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
                this._productsFacade.removePromotion(uuid).then(() =>
                    this._productsFacade.loadDateController(this.generateDate(this.dateFormControl.value))
                );
            }
        });
    }
}
