import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { IServiceRef } from "src/app/feature/services/model/service-ref.model";
import { IWorkerServiceRelation } from "../../model/worker-service-relation.model";

@Component({
    selector: "app-worker-service-view-modal",
    templateUrl: "./worker-service-view-modal.component.html",
    styleUrls: ["./worker-service-view-modal.component.sass"]
})
export class WorkerServiceViewModalComponent implements OnInit {

    @Input()
    public workerServiceRelationList: IWorkerServiceRelation;

    @Input()
    public serviceRefList: IServiceRef[];

    public workerServiceRelationForm: FormGroup;

    constructor() { }

    ngOnInit(): void {
        this.workerServiceRelationForm = new FormGroup({
            serviceRefList: new FormControl(this.workerServiceRelationList.serviceRef)
        });
    }

    public compareObjects(o1: any, o2: any): boolean {
        return o1.uuid === o2.uuid;
    }
}
