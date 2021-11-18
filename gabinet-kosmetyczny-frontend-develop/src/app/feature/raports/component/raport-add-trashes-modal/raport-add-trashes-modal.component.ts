import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ITrashesReport } from "src/app/core/home/model/trashes-report.interface";

@Component({
    selector: "app-raport-add-trashes-modal",
    templateUrl: "./raport-add-trashes-modal.component.html",
    styleUrls: ["./raport-add-trashes-modal.component.sass"]
})
export class RaportAddTrashesModalComponent implements OnInit {

    constructor(
        private _dialogRef: MatDialogRef<RaportAddTrashesModalComponent>
    ) { }

    public trashesRaportForm: FormGroup;

    ngOnInit(): void {
        this.trashesRaportForm = new FormGroup({
            title: new FormControl("", [Validators.required]),
            type: new FormControl("", [Validators.required]),
            amount: new FormControl("", [Validators.required]),
            cost: new FormControl("", [Validators.required])
        });
    }

    public sumbit(): void {
        const newRaport: ITrashesReport = {
            title: this.trashesRaportForm.value.title,
            date: new Date(),
            type: this.trashesRaportForm.value.type,
            amount: this.trashesRaportForm.value.amount,
            cost: this.trashesRaportForm.value.cost
        };
        this._dialogRef.close(newRaport);
    }
}
