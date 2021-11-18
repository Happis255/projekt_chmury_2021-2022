import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { IService } from "../../model/service.model";
import { ServiceAddModalComponent } from "../service-add-modal/service-add-modal.component";

@Component({
    selector: "app-service-edit-modal",
    templateUrl: "./service-edit-modal.component.html",
    styleUrls: ["./service-edit-modal.component.sass"]
})
export class ServiceEditModalComponent implements OnInit {

    @Input()
    public serviceToEdit: IService;

    public serviceForm: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<ServiceAddModalComponent>
    ) { }

    ngOnInit(): void {
        this.serviceForm = new FormGroup({
            type: new FormControl(this.serviceToEdit.type, [Validators.required]),
            name: new FormControl(this.serviceToEdit.name, [Validators.required]),
            description: new FormControl(this.serviceToEdit.description),
            price: new FormControl(this.serviceToEdit.price, [Validators.required, Validators.min(0)]),
            time: new FormControl(this.serviceToEdit.time, [Validators.required, Validators.min(0)]),
            advices: new FormControl(this.serviceToEdit.advices)
        });
    }

    public changeTo15Value(): void {
        let howMuch: number = this.serviceForm.value.time / 15;
        howMuch = Math.floor(howMuch);
        if (howMuch <= 0) {
            howMuch = 1;
        }
        if (howMuch > 32) {
            howMuch = 32;
        }
        this.serviceForm.controls?.time.setValue(howMuch * 15);
    }

    public sumbit(): void {
        const newService: IService = {};
        newService.uuid = this.serviceToEdit.uuid;
        newService.active = this.serviceToEdit.active;
        newService.type = this.serviceForm.value.type;
        newService.name = this.serviceForm.value.name;
        newService.description = this.serviceForm.value.description;
        newService.price = this.serviceForm.value.price;
        newService.time = this.serviceForm.value.time;
        newService.advices = this.serviceForm.value.advices;
        this._dialogRef.close(newService);
    }
}
