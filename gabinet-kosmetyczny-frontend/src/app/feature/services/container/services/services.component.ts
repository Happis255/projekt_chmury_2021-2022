import { Router } from "@angular/router";
import { ServiceEditModalComponent } from "./../../component/service-edit-modal/service-edit-modal.component";
import { ServiceAddModalComponent } from "./../../component/service-add-modal/service-add-modal.component";
import { IService } from "./../../model/service.model";
import { Subscription } from "rxjs";
import { ServicesFacade } from "./../../services.facade";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: "app-services",
    templateUrl: "./services.component.html",
    styleUrls: ["./services.component.sass"]
})
export class ServicesComponent implements OnInit, OnDestroy {

    public servicesTypeListSubscription: Subscription;
    public servicesTypeList: string[];
    public servicesListSubscription: Subscription;
    public servicesList: IService[];
    public type: string;

    constructor(
        private _servicesFacade: ServicesFacade,
        private _dialog: MatDialog,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._servicesFacade.loadAllServicesType();
        this.servicesTypeListSubscription = this._servicesFacade.getServicesTypeList().subscribe((list: string[]) => {
            this.servicesTypeList = list;
        });
        this.servicesListSubscription = this._servicesFacade.getServices().subscribe((list: IService[]) => {
            this.servicesList = list;
        });
        this._checkUrlIfToOpenModal();
    }

    ngOnDestroy(): void {
        if (this.servicesTypeListSubscription) {
            this.servicesTypeListSubscription.unsubscribe();
        }
        if (this.servicesListSubscription) {
            this.servicesListSubscription.unsubscribe();
        }
    }

    private _checkUrlIfToOpenModal(): void {
        if (this._router.url.includes("add-new")) {
            this.addService();
        }
    }

    public loadServiceType(type: string): void {
        if (type.length > 0) {
            this.type = type;
            this._servicesFacade.loadService(type);
        }
    }

    public editServiceInformation(service: IService): void {
        const dialogRef = this._dialog.open(ServiceEditModalComponent, {
            maxWidth: "35em",
            disableClose: true
        });
        dialogRef.componentInstance.serviceToEdit = service;
        dialogRef.afterClosed().subscribe((serviceEdited: IService) => {
            if (serviceEdited) {
                this._servicesFacade.editService(serviceEdited).then(() => {
                    this.type = serviceEdited.type;
                    this._servicesFacade.loadService(serviceEdited.type);
                    this._servicesFacade.loadAllServicesType();
                });
            }
        });
    }

    public switchActivationService(service: IService): void {
        this._servicesFacade.switchServiceToNotActive(service.uuid).then(() => {
            this._servicesFacade.loadService(this.type);
        });
    }

    public addService(): void {
        const dialogRef = this._dialog.open(ServiceAddModalComponent, {
            maxWidth: "35em",
            disableClose: true
        });
        dialogRef.afterClosed().subscribe((newService: IService) => {
            if (newService) {
                this._servicesFacade.addNewService(newService).then(() => {
                    this.type = newService.type;
                    this._servicesFacade.loadService(newService.type);
                    this._servicesFacade.loadAllServicesType();
                });
            }
        });
    }
}
