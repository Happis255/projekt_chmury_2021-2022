import { IHourAvailabilityList } from "./../../model/hour-availability-list.model";
import { VisitsFacade } from "./../../visits-facade";
import { Subscription } from "rxjs";
import { IServiceRef } from "./../../../services/model/service-ref.model";
import { IWorkerRef } from "./../../model/worker-ref.model";
import { IClientDataRef } from "./../../../clients/model/client-ref.model";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IWorkerHourAvaibility } from "../../model/worker-hour-avaibility.model";
import { INewVisitModel } from "../../model/new-visit.model";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-add-new-visit",
    templateUrl: "./add-new-visit.component.html",
    styleUrls: ["./add-new-visit.component.sass"]
})
export class AddNewVisitComponent implements OnInit, OnDestroy {

    public clientDatabase: IClientDataRef[] = [];
    public workerDatabase: IWorkerRef[] = [];
    public serviceDatabase: IServiceRef[] = [];
    public serviceForm: FormGroup;
    public subscriptionTable: Subscription[] = [];
    public workerHourAvaibility: IWorkerHourAvaibility[] = [];
    public workerHourList: IHourAvailabilityList[] = [];
    public minDay = new Date();

    constructor(
        private _visitsFacade: VisitsFacade,
        private _dialogRef: MatDialogRef<AddNewVisitComponent>
    ) { }

    ngOnInit(): void {
        this.serviceForm = new FormGroup({
            client: new FormControl(null, [Validators.required]),
            worker: new FormControl(null, [Validators.required]),
            service: new FormControl(null, [Validators.required]),
            day: new FormControl(null, [Validators.required]),
            hour: new FormControl(null, [Validators.required])
        });
        this.loadData();
        this.subscriptionTable.push(
            this._visitsFacade.getClientDataRef().subscribe((clientList: IClientDataRef[]) =>
                this.clientDatabase = clientList
            )
        );
        this.subscriptionTable.push(
            this._visitsFacade.getServiceRefList().subscribe((serviceList: IServiceRef[]) =>
                this.serviceDatabase = serviceList
            )
        );
        this.subscriptionTable.push(
            this._visitsFacade.getWorkerHourAvaibility$().subscribe((workerHourAvaibility: IWorkerHourAvaibility[]) =>
                this.workerHourAvaibility = workerHourAvaibility
            )
        );
        this.subscriptionTable.push(
            this.serviceForm.controls.service.valueChanges.subscribe(() => {
                this.serviceForm.controls.worker.setValue(null);
                this.serviceForm.controls.hour.setValue(null);
                this.serviceForm.controls.worker.reset();
                this.serviceForm.controls.hour.reset();
                this.workerHourList = [];
                if (this.serviceForm.value.service && this.serviceForm.value.day) {
                    this._visitsFacade.loadWorkerHourAvaibility(this.serviceForm.value.day, this.serviceForm.value.service);
                }
            })
        );
        this.subscriptionTable.push(
            this.serviceForm.controls.day.valueChanges.subscribe(() => {
                this.serviceForm.controls.worker.setValue(null);
                this.serviceForm.controls.hour.setValue(null);
                this.serviceForm.controls.worker.reset();
                this.serviceForm.controls.hour.reset();
                this.workerHourList = [];
                if (this.serviceForm.value.service && this.serviceForm.value.day) {
                    this._visitsFacade.loadWorkerHourAvaibility(this.serviceForm.value.day, this.serviceForm.value.service);
                }
            })
        );
        this.subscriptionTable.push(
            this.serviceForm.controls.worker.valueChanges.subscribe(() => {
                this.serviceForm.controls.hour.setValue(null);
                this.serviceForm.controls.hour.reset();
                this.workerHourList = [];
                if (this.serviceForm.value.worker != null) {
                    this.getHoursTable();
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptionTable.forEach((subscription: Subscription) => subscription.unsubscribe());
    }

    public myFilter = (d: Date | null): boolean => {
        const day = (d || new Date()).getDay();

        return day !== 0 && day !== 6;
    }

    public getHoursTable(): void {
        const hoursTableIndex = this.workerHourAvaibility.findIndex((element: IWorkerHourAvaibility) =>
            element.workerUuid === this.serviceForm.value.worker
        );
        if (this.workerHourAvaibility[hoursTableIndex]) {
            const hoursTable = this.workerHourAvaibility[hoursTableIndex].hourAvailabilityList;
            const hoursStringTable: IHourAvailabilityList[] = hoursTable.map((hour: IHourAvailabilityList) => {
                const newHour: IHourAvailabilityList = {
                    booked: hour.booked,
                    canfit: hour.canfit,
                    hours: hour.hours.length < 5 ? hour.hours + "0" : hour.hours
                };

                return newHour;
            });
            this.workerHourList = hoursStringTable;
        }
    }

    public loadData(): void {
        this._visitsFacade.loadServiceRefList();
        this._visitsFacade.loadClientRefList();
    }

    public sumbit(): void {
        const newService: INewVisitModel = {};
        if (this.serviceForm.value.client === "new-client") {
            newService.isItClient = false;
        } else {
            newService.isItClient = true;
            newService.clientUuid = this.serviceForm.value.client;
        }
        newService.workerUuid = this.serviceForm.value.worker;
        newService.serviceUuid = this.serviceForm.value.service;
        newService.date = this.serviceForm.value.day;
        newService.hour = this.serviceForm.value.hour.hours;
        this._dialogRef.close(newService);
    }
}
