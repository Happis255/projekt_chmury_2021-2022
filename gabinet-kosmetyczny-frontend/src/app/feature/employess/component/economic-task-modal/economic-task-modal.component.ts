import { IWorkerTask } from "./../../model/task.interface";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IWorkerAccountInfromation } from "src/app/feature/account/model/worker-account-information.interface";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-economic-task-modal",
    templateUrl: "./economic-task-modal.component.html",
    styleUrls: ["./economic-task-modal.component.sass"]
})
export class EconomicTaskModalComponent implements OnInit {

    @Input()
    public workersList: IWorkerAccountInfromation[] = [];

    @Input()
    public editMode = true;

    @Input()
    public economicTask: IWorkerTask = {};

    public economicTaskForm: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<EconomicTaskModalComponent>
    ) { }

    ngOnInit(): void {
        if (this.editMode) {
            this.economicTaskForm = new FormGroup({
                title: new FormControl(this.economicTask.title, [Validators.required]),
                description: new FormControl(this.economicTask.description),
                dateFrom: new FormControl(this.economicTask.dateFrom, [Validators.required]),
                dateTo: new FormControl(this.economicTask.dateTo, [Validators.required]),
                workerUuid: new FormControl(this.economicTask.workerUuid, [Validators.required])
            });
        } else {
            this.economicTaskForm = new FormGroup({
                title: new FormControl("", [Validators.required]),
                description: new FormControl(""),
                dateFrom: new FormControl("", [Validators.required]),
                dateTo: new FormControl("", [Validators.required]),
                workerUuid: new FormControl("", [Validators.required])
            });
        }
    }

    public submit(): void {
        this.economicTask.title = this.economicTaskForm.value.title;
        this.economicTask.description = this.economicTaskForm.value.description;
        this.economicTask.dateFrom = this.economicTaskForm.value.dateFrom;
        this.economicTask.dateTo = this.economicTaskForm.value.dateTo;
        this.economicTask.workerUuid = this.economicTaskForm.value.workerUuid;
        this._dialogRef.close(this.economicTask);
    }
}
