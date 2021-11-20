import { IReport } from "./../../../../core/home/model/report.interface";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-raports-add-modal",
    templateUrl: "./raports-add-modal.component.html",
    styleUrls: ["./raports-add-modal.component.sass"]
})
export class RaportsAddModalComponent implements OnInit {

    constructor(
        private _dialogRef: MatDialogRef<RaportsAddModalComponent>
    ) { }

    public raportForm: FormGroup;

    ngOnInit(): void {
        this.raportForm = new FormGroup({
            title: new FormControl("", [Validators.required]),
            type: new FormControl("", [Validators.required]),
            description: new FormControl("")
        });
    }

    public sumbit(): void {
        const newRaport: IReport = {
            type: this.raportForm.value.type,
            title: this.raportForm.value.title,
            description: this.raportForm.value.description,
            date: new Date()
        };
        this._dialogRef.close(newRaport);
    }
}
