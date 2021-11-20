import { IEquipment } from "./../../model/equipment";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-add-new-equipment-modal",
    templateUrl: "./add-new-equipment-modal.component.html",
    styleUrls: ["./add-new-equipment-modal.component.sass"]
})
export class AddNewEquipmentModalComponent implements OnInit {

    public equipmentForm: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<AddNewEquipmentModalComponent>
    ) { }

    ngOnInit(): void {
        this.equipmentForm = new FormGroup({
            name: new FormControl("", [Validators.required]),
            description: new FormControl("", [Validators.required]),
            getDate: new FormControl("", [Validators.required]),
            warrantyDate: new FormControl("", [Validators.required]),
            comments: new FormControl(""),
        });
    }

    public sumbit(): void {
        const newEquipment: IEquipment = {};
        newEquipment.name = this.equipmentForm.value.name;
        newEquipment.description = this.equipmentForm.value.description;
        newEquipment.getDate = this.equipmentForm.value.getDate;
        newEquipment.warrantyDate = this.equipmentForm.value.warrantyDate;
        newEquipment.comments = this.equipmentForm.value.comments;
        this._dialogRef.close(newEquipment);
    }
}
