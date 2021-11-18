import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { IClientData } from "../../model/client.model";

@Component({
    selector: "app-client-view-modal",
    templateUrl: "./client-view-modal.component.html",
    styleUrls: ["./client-view-modal.component.sass"]
})
export class ClientViewModalComponent implements OnInit {

    @Input()
    public clientToView: IClientData;

    public clientAccountData: FormGroup;

    constructor() { }

    ngOnInit(): void {
        this.clientAccountData = new FormGroup({
            email: new FormControl({value: this.clientToView.email, disabled: true}),
            name: new FormControl({value: this.clientToView.name, disabled: true}),
            surname: new FormControl({value: this.clientToView.surname, disabled: true}),
            street: new FormControl({value: this.clientToView.street, disabled: true}),
            code: new FormControl({value: this.clientToView.code, disabled: true}),
            town: new FormControl({value: this.clientToView.town, disabled: true}),
            birthday: new FormControl({value: this.clientToView.birthday, disabled: true}),
            phone: new FormControl({value: this.clientToView.phone, disabled: true})
        });
    }
}
