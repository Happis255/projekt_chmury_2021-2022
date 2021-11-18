import { IProductRef } from "./../model/product-ref.model";
import { IProductPromotion } from "./../model/product-promotion.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProductForSell } from "src/app/core/home/model/product-for-sell.interface";
import { IProductForUse } from "src/app/core/home/model/product-for-use.interface";
import { environment } from "src/environments/environment";
import { IProductPromotionDateControl } from "../model/product-promotion-date.form";

@Injectable()
export class ProductsApi {

    constructor(
        private http: HttpClient
    ) { }

    public getAllProductsForUse(): Observable<IProductForUse[]> {
        return this.http.get<any>(environment.api + "worker/products/for-use");
    }

    public getAllProductsForSell(): Observable<IProductForSell[]> {
        return this.http.get<any>(environment.api + "worker/products/for-sell");
    }

    public removeOneProductUse(uuid: string): Observable<any> {
        return this.http.patch<any>(environment.api + "worker/product-for-use/remove-one/" + uuid, null);
    }

    public addOneProductUse(uuid: string): Observable<any> {
        return this.http.patch<any>(environment.api + "worker/product-for-use/add-one/" + uuid, null);
    }

    public deleteProductUse(uuid: string): Observable<any> {
        return this.http.delete<any>(environment.api + "worker/product-for-use/" + uuid);
    }

    public deleteProductSell(uuid: string): Observable<any> {
        return this.http.delete<any>(environment.api + "worker/product-for-sell/" + uuid);
    }

    public removeOneProductSell(uuid: string): Observable<any> {
        return this.http.patch<any>(environment.api + "worker/product-for-sell/remove-one/" + uuid, null);
    }

    public addOneProductSell(uuid: string): Observable<any> {
        return this.http.patch<any>(environment.api + "worker/product-for-sell/add-one/" + uuid, null);
    }

    public editProductSell(editedProduct: IProductForSell): Observable<any>  {
        return this.http.patch<any>(environment.api + "worker/product-for-sell", editedProduct);
    }

    public addnewProduct(newProduct: IProductForSell): Observable<any>  {
        return this.http.put<any>(environment.api + "worker/product-for-sell", newProduct);
    }

    public editProductUse(editedProduct: IProductForUse): Observable<any>  {
        return this.http.patch<any>(environment.api + "worker/product-for-use", editedProduct);
    }

    public addProductUse(newProduct: IProductForUse): Observable<any>  {
        return this.http.put<any>(environment.api + "worker/product-for-use", newProduct);
    }

    public getDateController(dateToString: string): Observable<IProductPromotionDateControl> {
        return this.http.get<any>(environment.api + "worker/products/promotions/date-controller/" + dateToString);
    }

    public deletePromotion(uuid: string): Observable<void> {
        return this.http.delete<any>(environment.api + "admin/products/promotions/" + uuid);
    }

    public getPromotionsFromDate(date: Date): Observable<IProductPromotion[]> {
        return this.http.get<any>(environment.api + "worker/products/promotions/" + date);
    }

    public loadProductListRef(): Observable<IProductRef[]> {
        return this.http.get<any>(environment.api + "worker/products/for-sell/ref");
    }

    public addNewPromotion(newPromotion: IProductPromotion): Observable<IProductPromotion>  {
        return this.http.put<any>(environment.api + "admin/products/promotions", newPromotion);
    }

    public editPromotion(editedPromotion: IProductPromotion): Observable<IProductPromotion>  {
        return this.http.patch<any>(environment.api + "admin/products/promotions", editedPromotion);
    }
}
