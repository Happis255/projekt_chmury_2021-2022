import { IClientData } from "./../../model/client.model";
import { INewClientMessage } from "./../../model/client-message.interface";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-client-send-message",
    templateUrl: "./client-send-message.component.html",
    styleUrls: ["./client-send-message.component.sass"]
})
export class ClientSendMessageComponent implements OnInit {

    @Input()
    public clientsList: IClientData[] = [];

    public sendTo: IClientData[] = [];
    public messageText = "";
    public messageForm: FormGroup;
    public selected = -1;

    constructor(
        private _dialogRef: MatDialogRef<ClientSendMessageComponent>
    ) { }

    ngOnInit(): void {
        this.messageForm = new FormGroup({
            topic: new FormControl("", [Validators.required]),
            clientsToRecieve: new FormControl("", [Validators.required]),
            messageText: new FormControl("", [Validators.required])
        });
    }

    public sumbit(): void {
        const message: INewClientMessage = {};
        message.topic = this.messageForm.value.topic;
        message.messageText = this.messageForm.value.messageText;
        message.uuid = [];
        this.messageForm.value.clientsToRecieve.forEach((client: IClientData) => {
            message.uuid.push(client.accountUuid);
        });
        this._dialogRef.close(message);
    }

}
