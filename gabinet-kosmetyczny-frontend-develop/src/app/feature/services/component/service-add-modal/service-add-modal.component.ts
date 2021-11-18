import { IService } from "./../../model/service.model";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-service-add-modal",
    templateUrl: "./service-add-modal.component.html",
    styleUrls: ["./service-add-modal.component.sass"]
})
export class ServiceAddModalComponent implements OnInit {

    public serviceForm: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<ServiceAddModalComponent>
    ) { }

    ngOnInit(): void {
        this.serviceForm = new FormGroup({
            type: new FormControl("", [Validators.required]),
            name: new FormControl("", [Validators.required]),
            description: new FormControl(""),
            price: new FormControl("", [Validators.required, Validators.min(0)]),
            time: new FormControl("", [Validators.required, Validators.min(0)]),
            advices: new FormControl("")
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
        newService.type = this.serviceForm.value.type;
        newService.name = this.serviceForm.value.name;
        newService.description = this.serviceForm.value.description;
        newService.price = this.serviceForm.value.price;
        newService.time = this.serviceForm.value.time;
        newService.advices = this.serviceForm.value.advices;
        this._dialogRef.close(newService);
    }
}
