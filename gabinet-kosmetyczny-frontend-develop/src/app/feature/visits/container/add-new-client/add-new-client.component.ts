import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, Input, OnInit } from "@angular/core";
import { INewVisitModel } from "../../model/new-visit.model";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-add-new-client",
    templateUrl: "./add-new-client.component.html",
    styleUrls: ["./add-new-client.component.sass"]
})
export class AddNewClientComponent implements OnInit {

    @Input()
    public newVisit: INewVisitModel;

    public clientForm: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<AddNewClientComponent>
    ) { }

    ngOnInit(): void {
        this.clientForm = new FormGroup({
            name: new FormControl(null, [Validators.required]),
            surname: new FormControl(null, [Validators.required]),
            phone: new FormControl(null, [Validators.required]),
            email: new FormControl("", [Validators.required, Validators.email])
        });
    }

    public submit(): void {
        this.newVisit.unregisteredClient = {
            name: this.clientForm.value.name,
            surname: this.clientForm.value.surname,
            phone: this.clientForm.value.phone,
            email: this.clientForm.value.email
        };
        this._dialogRef.close(this.newVisit);
    }

}
