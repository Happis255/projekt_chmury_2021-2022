import { IServiceRef } from "./../../../services/model/service-ref.model";
import { Component, Input, OnInit } from "@angular/core";
import { IWorkerServiceRelation } from "../../model/worker-service-relation.model";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-worker-service-edit-modal",
    templateUrl: "./worker-service-edit-modal.component.html",
    styleUrls: ["./worker-service-edit-modal.component.sass"]
})
export class WorkerServiceEditModalComponent implements OnInit {

    @Input()
    public workerServiceRelationList: IWorkerServiceRelation;

    @Input()
    public serviceRefList: IServiceRef[];

    public workerServiceRelationForm: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<WorkerServiceEditModalComponent>
    ) { }

    ngOnInit(): void {
        this.workerServiceRelationForm = new FormGroup({
            serviceRefList: new FormControl(this.workerServiceRelationList.serviceRef)
        });
    }

    public compareObjects(o1: any, o2: any): boolean {
        return o1.uuid === o2.uuid;
    }

    public sumbit(): void {
        this.workerServiceRelationList.serviceRef =  this.workerServiceRelationForm.value.serviceRefList;
        this._dialogRef.close(this.workerServiceRelationList);
    }
}
