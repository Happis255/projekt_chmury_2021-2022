import { IProductRef } from './../model/product-ref.model';
import { IProductPromotionWeek } from "./../model/week-promotions.interface";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IProductForSell } from "src/app/core/home/model/product-for-sell.interface";
import { IProductForUse } from "src/app/core/home/model/product-for-use.interface";
import { IProductPromotionDateControl } from "../model/product-promotion-date.form";

@Injectable()
export class ProductsState {
    private _productForSell = new BehaviorSubject<IProductForSell[]>(null);
    private _productForUse = new BehaviorSubject<IProductForUse[]>(null);
    private _dateController = new BehaviorSubject<IProductPromotionDateControl>(null);
    private _weekPromotions = new BehaviorSubject<IProductPromotionWeek>({
        mondayProductPromotions: [],
        tuesdayProductPromotions: [],
        wednesdayProductPromotions: [],
        thursdayProductPromotions: [],
        fridayProductPromotions: []
    });
    private _productForSellRefList = new BehaviorSubject<IProductRef[]>(null);

    public setProductForSell(productForSell: IProductForSell[]): void {
        this._productForSell.next(productForSell);
    }

    public getProductForSell$(): Observable<IProductForSell[]> {
        return this._productForSell.asObservable();
    }

    public setProductForUse(productForUse: IProductForUse[]): void {
        this._productForUse.next(productForUse);
    }

    public getProductForUse$(): Observable<IProductForUse[]> {
        return this._productForUse.asObservable();
    }

    public getDateController$(): Observable<IProductPromotionDateControl> {
        return this._dateController.asObservable();
    }

    public setDateController(controller: IProductPromotionDateControl): void {
        this._dateController.next(controller);
    }

    public getWeekPromotions$(): Observable<IProductPromotionWeek> {
        return this._weekPromotions.asObservable();
    }

    public setWeekPromotions(weekPromotions: IProductPromotionWeek): void {
        this._weekPromotions.next(weekPromotions);
    }

    public getProductListRef(): IProductRef[] {
        return this._productForSellRefList.getValue();
    }

    public getProductListRef$(): Observable<IProductRef[]> {
        return this._productForSellRefList.asObservable();
    }

    public setProductListRef(productForSellRefList: IProductRef[]): void {
        this._productForSellRefList.next(productForSellRefList);
    }
}
