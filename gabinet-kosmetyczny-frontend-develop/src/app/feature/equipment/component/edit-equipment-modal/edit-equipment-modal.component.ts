import { IEquipment } from "./../../model/equipment";
import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { AddNewEquipmentModalComponent } from "../add-new-equipment-modal/add-new-equipment-modal.component";

@Component({
    selector: "app-edit-equipment-modal",
    templateUrl: "./edit-equipment-modal.component.html",
    styleUrls: ["./edit-equipment-modal.component.sass"]
})
export class EditEquipmentModalComponent implements OnInit {

    @Input()
    public equipment: IEquipment;

    public equipmentForm: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<AddNewEquipmentModalComponent>
    ) { }

    ngOnInit(): void {
        this.equipmentForm = new FormGroup({
            name: new FormControl(this.equipment.name, [Validators.required]),
            description: new FormControl(this.equipment.description, [Validators.required]),
            getDate: new FormControl(this.equipment.getDate, [Validators.required]),
            warrantyDate: new FormControl(this.equipment.warrantyDate, [Validators.required]),
            comments: new FormControl(this.equipment.comments)
        });
    }

    public sumbit(): void {
        const editedEquipment: IEquipment = {
            uuid: this.equipment.uuid,
            name: this.equipment.name,
            description: this.equipment.description,
            getDate: this.equipment.getDate,
            warrantyDate: this.equipment.warrantyDate,
            lastCheckDate: this.equipment.lastCheckDate,
            comments: this.equipment.comments,
            toCheck: this.equipment.toCheck
        };
        editedEquipment.name = this.equipmentForm.value.name;
        editedEquipment.description = this.equipmentForm.value.description;
        editedEquipment.getDate = this.equipmentForm.value.getDate;
        editedEquipment.warrantyDate = this.equipmentForm.value.warrantyDate;
        editedEquipment.comments = this.equipmentForm.value.comments;
        this._dialogRef.close(editedEquipment);
    }
}
