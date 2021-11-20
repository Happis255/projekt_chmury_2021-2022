import { IServiceRef } from "./model/service-ref.model";
import { IServicePromotionWeek } from "./model/week-promotions.interface";
import { IServicePromotion } from "./model/service-promotion.model";
import { IServicepromotionDateControl } from "./model/service-promotion-date.form";
import { IService } from "./model/service.model";
import { ServicesState } from "./state/services.state";
import { ServicesApi } from "./api/services-api";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ServicesFacade {
    constructor(
        private _servicesApi: ServicesApi,
        private _servicesState: ServicesState
    ) { }

    public loadAllServicesType(): void {
        this._servicesApi.getServicesType().toPromise()
            .then((list: string[]) => {
                this._servicesState.setServicesTypeList(list);
            });
    }

    public loadService(type: string): void {
        this._servicesApi.getServicesWithType(type).toPromise()
            .then((list: IService[]) => {
                this._servicesState.setServices(list);
            });
    }

    public loadDateController(dateToString: string): void {
        this._servicesApi.getDateController(dateToString).toPromise()
            .then((promotionDateControl: IServicepromotionDateControl) => {
                this._servicesState.setDateController(promotionDateControl);
            });
    }

    public loadServiceListRef(): void {
        this._servicesApi.loadServiceListRef().toPromise()
            .then((serviceRefList: IServiceRef[]) => {
                this._servicesState.setServicesListRef(serviceRefList);
            });
    }

    public loadPromotionInformations(dateControler: IServicepromotionDateControl): void {
        const promises = [];
        promises.push(this._servicesApi.getPromotionsFromDate(dateControler.mondayDate).toPromise());
        promises.push(this._servicesApi.getPromotionsFromDate(dateControler.tuesdayDate).toPromise());
        promises.push(this._servicesApi.getPromotionsFromDate(dateControler.wednesdayDate).toPromise());
        promises.push(this._servicesApi.getPromotionsFromDate(dateControler.thursdayDate).toPromise());
        promises.push(this._servicesApi.getPromotionsFromDate(dateControler.fridayDate).toPromise());
        Promise.all(promises).then((servicesPromotion: IServicePromotion[][]) => {
            const weekServicePromotions: IServicePromotionWeek = {
                mondayServicePromotions: servicesPromotion[0],
                tuesdayServicePromotions: servicesPromotion[1],
                wednesdayServicePromotions: servicesPromotion[2],
                thursdayServicePromotions: servicesPromotion[3],
                fridayServicePromotions: servicesPromotion[4]
            };
            this._servicesState.setWeekPromotions(weekServicePromotions);
        });
    }

    public addNewPromotion(newPromotion: IServicePromotion): Promise<IServicePromotion> {
        return this._servicesApi.addNewPromotion(newPromotion).toPromise();
    }

    public editPromotion(editedPromotion: IServicePromotion): Promise<IServicePromotion> {
        return this._servicesApi.editPromotion(editedPromotion).toPromise();
    }

    public removePromotion(uuid: string): Promise<void> {
        return this._servicesApi.deletePromotion(uuid).toPromise();
    }

    public getDateController$(): Observable<IServicepromotionDateControl> {
        return this._servicesState.getDateController$();
    }

    public editService(serviceEdited: IService): Promise<IService> {
        return this._servicesApi.editService(serviceEdited).toPromise();
    }

    public addNewService(newService: IService): Promise<IService> {
        return this._servicesApi.addService(newService).toPromise();
    }

    public getServicesTypeList(): Observable<string[]> {
        return this._servicesState.getServicesTypeList$();
    }

    public getServices(): Observable<IService[]> {
        return this._servicesState.getServices$();
    }

    public getWeekPromotions$(): Observable<IServicePromotionWeek> {
        return this._servicesState.getWeekPromotions$();
    }

    public switchServiceToNotActive(uuid: string): Promise<IService> {
        return this._servicesApi.switchService(uuid).toPromise();
    }

    public getServicesListRef$(): Observable<IServiceRef[]> {
        return this._servicesState.getServicesListRef$();
    }
}
