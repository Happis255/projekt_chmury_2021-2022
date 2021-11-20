import { IProductRef } from "./model/product-ref.model";
import { IProductPromotion } from "./model/product-promotion.model";
import { ProductsState } from "./state/products.state";
import { ProductsApi } from "./api/products.api";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProductForSell } from "src/app/core/home/model/product-for-sell.interface";
import { IProductForUse } from "src/app/core/home/model/product-for-use.interface";
import { IProductPromotionDateControl } from "./model/product-promotion-date.form";
import { IProductPromotionWeek } from "./model/week-promotions.interface";

@Injectable()
export class ProductsFacade {
    constructor(
        private _productsState: ProductsState,
        private _productsApi: ProductsApi
    ) { }

    public loadAllProductsForUse(): void {
        this._productsApi.getAllProductsForUse()
            .toPromise()
            .then((products: IProductForUse[]) => {
                this._productsState.setProductForUse(products);
            });
    }

    public loadAllProductsForSell(): void {
        this._productsApi.getAllProductsForSell()
            .toPromise()
            .then((products: IProductForSell[]) => {
                this._productsState.setProductForSell(products);
            });
    }

    public loadDateController(dateToString: string): void {
        this._productsApi.getDateController(dateToString).toPromise()
            .then((promotionDateControl: IProductPromotionDateControl) => {
                this._productsState.setDateController(promotionDateControl);
            });
    }

    public loadProductListRef(): void {
        this._productsApi.loadProductListRef().toPromise()
            .then((productRefList: IProductRef[]) => {
                this._productsState.setProductListRef(productRefList);
            });
    }

    public loadPromotionInformations(dateControler: IProductPromotionDateControl): void {
        const promises = [];
        promises.push(this._productsApi.getPromotionsFromDate(dateControler.mondayDate).toPromise());
        promises.push(this._productsApi.getPromotionsFromDate(dateControler.tuesdayDate).toPromise());
        promises.push(this._productsApi.getPromotionsFromDate(dateControler.wednesdayDate).toPromise());
        promises.push(this._productsApi.getPromotionsFromDate(dateControler.thursdayDate).toPromise());
        promises.push(this._productsApi.getPromotionsFromDate(dateControler.fridayDate).toPromise());
        Promise.all(promises).then((productsPromotion: IProductPromotion[][]) => {
            const weekProductsPromotions: IProductPromotionWeek = {
                mondayProductPromotions: productsPromotion[0],
                tuesdayProductPromotions: productsPromotion[1],
                wednesdayProductPromotions: productsPromotion[2],
                thursdayProductPromotions: productsPromotion[3],
                fridayProductPromotions: productsPromotion[4]
            };
            this._productsState.setWeekPromotions(weekProductsPromotions);
        });
    }

    public getProductForSell$(): Observable<IProductForSell[]> {
        return this._productsState.getProductForSell$();
    }

    public getProductForUse$(): Observable<IProductForUse[]> {
        return this._productsState.getProductForUse$();
    }

    public removeOneProductUse(uuid: string): Promise<any> {
        return this._productsApi.removeOneProductUse(uuid).toPromise();
    }

    public addOneProductUse(uuid: string): Promise<any> {
        return this._productsApi.addOneProductUse(uuid).toPromise();
    }

    public deleteProductUse(uuid: string): Promise<any> {
        return this._productsApi.deleteProductUse(uuid).toPromise();
    }

    public deleteProductSell(uuid: string): Promise<any> {
        return this._productsApi.deleteProductSell(uuid).toPromise();
    }

    public removeOneProductSell(uuid: string): Promise<any> {
        return this._productsApi.removeOneProductSell(uuid).toPromise();
    }

    public addOneProductSell(uuid: string): Promise<any> {
        return this._productsApi.addOneProductSell(uuid).toPromise();
    }

    public editProductSell(editedProduct: IProductForSell): Promise<any> {
        return this._productsApi.editProductSell(editedProduct).toPromise();
    }

    public addnewProduct(newProduct: IProductForSell): Promise<any> {
        return this._productsApi.addnewProduct(newProduct).toPromise();
    }

    public editProductUse(editedProduct: IProductForUse): Promise<any> {
        return this._productsApi.editProductUse(editedProduct).toPromise();
    }

    public addProductUse(newProduct: IProductForUse): Promise<any> {
        return this._productsApi.addProductUse(newProduct).toPromise();
    }

    public getDateController$(): Observable<IProductPromotionDateControl> {
        return this._productsState.getDateController$();
    }

    public getWeekPromotions$(): Observable<IProductPromotionWeek> {
        return this._productsState.getWeekPromotions$();
    }

    public removePromotion(uuid: string): Promise<void> {
        return this._productsApi.deletePromotion(uuid).toPromise();
    }

    public getProductListRef$(): Observable<IProductRef[]> {
        return this._productsState.getProductListRef$();
    }

    public addNewPromotion(newPromotion: IProductPromotion): Promise<IProductPromotion> {
        return this._productsApi.addNewPromotion(newPromotion).toPromise();
    }

    public editPromotion(editedPromotion: IProductPromotion): Promise<IProductPromotion> {
        return this._productsApi.editPromotion(editedPromotion).toPromise();
    }
}
