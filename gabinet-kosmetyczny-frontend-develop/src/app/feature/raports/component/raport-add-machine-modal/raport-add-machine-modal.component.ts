import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { IMachineReport } from "src/app/core/home/model/machine-report.interface";

@Component({
    selector: "app-raport-add-machine-modal",
    templateUrl: "./raport-add-machine-modal.component.html",
    styleUrls: ["./raport-add-machine-modal.component.sass"]
})
export class RaportAddMachineModalComponent implements OnInit {

    constructor(
        private _dialogRef: MatDialogRef<RaportAddMachineModalComponent>
    ) { }

    public machineRaportForm: FormGroup;

    ngOnInit(): void {
        this.machineRaportForm = new FormGroup({
            title: new FormControl("", [Validators.required]),
            description: new FormControl("")
        });
    }

    public sumbit(): void {
        const newRaport: IMachineReport = {
            title: this.machineRaportForm.value.title,
            description: this.machineRaportForm.value.description,
            date: new Date()
        };
        this._dialogRef.close(newRaport);
    }
}
