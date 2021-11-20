import { IWorkerAccountInfromation } from "./../../../account/model/worker-account-information.interface";
import { Component, Input, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { INewWorkerMessage } from "../../model/workers-message.interface";

@Component({
    selector: "app-employee-send-message-modal",
    templateUrl: "./employee-send-message-modal.component.html",
    styleUrls: ["./employee-send-message-modal.component.sass"]
})
export class EmployeeSendMessageModalComponent implements OnInit {

    @Input()
    public workersList: IWorkerAccountInfromation[] = [];

    public sendTo: IWorkerAccountInfromation[] = [];
    public messageText = "";
    public messageForm: FormGroup;
    public selected = -1;
    public workersToRecieve = new FormControl("", [Validators.required]);

    constructor(
        private _dialogRef: MatDialogRef<EmployeeSendMessageModalComponent>
    ) { }

    ngOnInit(): void {
        this.messageForm = new FormGroup({
            topic: new FormControl("", [Validators.required]),
            workersToRecieve: this.workersToRecieve,
            messageText: new FormControl("", [Validators.required])
        });
    }

    public sumbit(): void {
        const message: INewWorkerMessage = {};
        message.topic = this.messageForm.value.topic;
        message.messageText = this.messageForm.value.messageText;
        message.uuid = [];
        this.messageForm.value.workersToRecieve.forEach((uuid: IWorkerAccountInfromation) => {
            message.uuid.push(uuid.accountUuid);
        });
        this._dialogRef.close(message);
    }
}
