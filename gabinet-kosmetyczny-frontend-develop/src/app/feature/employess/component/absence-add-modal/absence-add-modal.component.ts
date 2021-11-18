import { IAbsence } from "./../../model/absence.interface";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IWorkerAccountInfromation } from "src/app/feature/account/model/worker-account-information.interface";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-absence-add-modal",
    templateUrl: "./absence-add-modal.component.html",
    styleUrls: ["./absence-add-modal.component.sass"]
})
export class AbsenceAddModalComponent implements OnInit {

    @Input()
    public workersList: IWorkerAccountInfromation[];

    public absenceForm: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<AbsenceAddModalComponent>
    ) { }

    ngOnInit(): void {
        this.absenceForm = new FormGroup({
            title: new FormControl("", [Validators.required]),
            reason: new FormControl("", [Validators.required]),
            from: new FormControl("", [Validators.required]),
            to: new FormControl("", [Validators.required]),
            worker: new FormControl("", [Validators.required]),
        });
    }

    public sumbit(): void {
        const newAbsence: IAbsence = {};
        newAbsence.title = this.absenceForm.value.title;
        newAbsence.dateFrom = this.absenceForm.value.from;
        newAbsence.dateTo = this.absenceForm.value.to;
        newAbsence.workerUuid = this.absenceForm.value.worker.uuid;
        newAbsence.reason = this.absenceForm.value.reason;
        this._dialogRef.close(newAbsence);
    }

}
