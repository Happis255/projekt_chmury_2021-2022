import { IServiceRef } from './../model/service-ref.model';
import { IServicePromotion } from './../model/service-promotion.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IServicepromotionDateControl } from "../model/service-promotion-date.form";
import { IService } from "../model/service.model";

@Injectable()
export class ServicesApi {
    constructor(
        private http: HttpClient
    ) { }

    public getServicesType(): Observable<string[]> {
        return this.http.get<any>(environment.api + "worker/services/type");
    }

    public getServicesWithType(type: string): Observable<IService[]> {
        return this.http.get<any>(environment.api + "worker/services/" + type);
    }

    public switchService(uuid: string): Observable<IService> {
        return this.http.patch<any>(environment.api + "worker/service/status", {uuid});
    }

    public addService(service: IService): Observable<IService> {
        return this.http.put<any>(environment.api + "worker/service", service);
    }

    public editService(service: IService): Observable<IService> {
        return this.http.patch<any>(environment.api + "worker/service", service);
    }

    public getDateController(dateToString: string): Observable<IServicepromotionDateControl> {
        return this.http.get<any>(environment.api + "worker/services/promotions/date-controller/" + dateToString);
    }

    public getPromotionsFromDate(date: Date): Observable<IServicePromotion[]> {
        return this.http.get<any>(environment.api + "worker/services/promotions/" + date);
    }

    public addNewPromotion(newPromotion: IServicePromotion): Observable<IServicePromotion>  {
        return this.http.put<any>(environment.api + "admin/services/promotions", newPromotion);
    }

    public deletePromotion(uuid: string): Observable<void> {
        return this.http.delete<any>(environment.api + "admin/services/promotions/" + uuid);
    }

    public loadServiceListRef(): Observable<IServiceRef[]> {
        return this.http.get<any>(environment.api + "worker/services/ref");
    }

    public editPromotion(editedPromotion: IServicePromotion): Observable<IServicePromotion>  {
        return this.http.patch<any>(environment.api + "admin/services/promotions", editedPromotion);
    }
}
