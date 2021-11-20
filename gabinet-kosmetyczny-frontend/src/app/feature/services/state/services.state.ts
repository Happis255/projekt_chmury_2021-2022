import { IServiceRef } from "./../model/service-ref.model";
import { IServicePromotionWeek } from "./../model/week-promotions.interface";
import { IServicepromotionDateControl } from "./../model/service-promotion-date.form";
import { IService } from "./../model/service.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class ServicesState {
    private _servicesTypeList = new BehaviorSubject<string[]>(null);
    private _servicesList = new BehaviorSubject<IService[]>(null);
    private _servicesListRef = new BehaviorSubject<IServiceRef[]>(null);
    private _dateController = new BehaviorSubject<IServicepromotionDateControl>(null);
    private _weekPromotions = new BehaviorSubject<IServicePromotionWeek>({
        mondayServicePromotions: [],
        tuesdayServicePromotions: [],
        wednesdayServicePromotions: [],
        thursdayServicePromotions: [],
        fridayServicePromotions: []
    });

    public getServicesTypeList$(): Observable<string[]> {
        return this._servicesTypeList.asObservable();
    }

    public setServicesTypeList(list: string[]): void {
        this._servicesTypeList.next(list);
    }

    public getServices$(): Observable<IService[]> {
        return this._servicesList.asObservable();
    }

    public setServices(list: IService[]): void {
        this._servicesList.next(list);
    }

    public getDateController$(): Observable<IServicepromotionDateControl> {
        return this._dateController.asObservable();
    }

    public setDateController(controller: IServicepromotionDateControl): void {
        this._dateController.next(controller);
    }

    public getWeekPromotions$(): Observable<IServicePromotionWeek> {
        return this._weekPromotions.asObservable();
    }

    public setWeekPromotions(weekPromotions: IServicePromotionWeek): void {
        this._weekPromotions.next(weekPromotions);
    }

    public getServicesListRef$(): Observable<IServiceRef[]> {
        return this._servicesListRef.asObservable();
    }

    public getServicesListRef(): IServiceRef[] {
        return this._servicesListRef.getValue();
    }

    public setServicesListRef(serviceListRef: IServiceRef[]): void {
        this._servicesListRef.next(serviceListRef);
    }
}
