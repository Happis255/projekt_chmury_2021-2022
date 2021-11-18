import { IService } from "../../model/service.model";
import { Subscription } from "rxjs";
import { ServicesFacade } from "../../services.facade";
import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
    selector: "app-services",
    templateUrl: "./services-worker.component.html",
    styleUrls: ["./services-worker.component.sass"]
})
export class ServicesWorkerComponent implements OnInit, OnDestroy {

    public servicesTypeListSubscription: Subscription;
    public servicesTypeList: string[];
    public servicesListSubscription: Subscription;
    public servicesList: IService[];
    public type: string;

    constructor(
        private _servicesFacade: ServicesFacade
    ) { }

    ngOnInit(): void {
        this._servicesFacade.loadAllServicesType();
        this.servicesTypeListSubscription = this._servicesFacade.getServicesTypeList().subscribe((list: string[]) => {
            this.servicesTypeList = list;
        });
        this.servicesListSubscription = this._servicesFacade.getServices().subscribe((list: IService[]) => {
            this.servicesList = list;
        });
    }

    ngOnDestroy(): void {
        if (this.servicesTypeListSubscription) {
            this.servicesTypeListSubscription.unsubscribe();
        }
        if (this.servicesListSubscription) {
            this.servicesListSubscription.unsubscribe();
        }
    }

    public loadServiceType(type: string): void {
        if (type.length > 0) {
            this.type = type;
            this._servicesFacade.loadService(type);
        }
    }
}
