import { IEvent } from './../../model/event.model';
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-add-new-event-modal",
    templateUrl: "./add-new-event-modal.component.html",
    styleUrls: ["./add-new-event-modal.component.sass"]
})
export class AddNewEventModalComponent implements OnInit {

    public eventForm: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<AddNewEventModalComponent>
    ) { }

    ngOnInit(): void {
        this.eventForm = new FormGroup({
            type: new FormControl("", [Validators.required]),
            name: new FormControl("", [Validators.required]),
            street: new FormControl("", [Validators.required]),
            code: new FormControl("", [Validators.required]),
            town: new FormControl("", [Validators.required]),
            dateFrom: new FormControl("", [Validators.required]),
            dateTo: new FormControl("", [Validators.required]),
            description: new FormControl(""),
            price: new FormControl("", [Validators.min(0)]),
        });
    }

    public sumbit(): void {
        const newEvent: IEvent = {};
        newEvent.type = this.eventForm.value.type;
        newEvent.name = this.eventForm.value.name;
        newEvent.street = this.eventForm.value.street;
        newEvent.code = this.eventForm.value.code;
        newEvent.town = this.eventForm.value.town;
        newEvent.dateFrom = this.eventForm.value.dateFrom;
        newEvent.dateTo = this.eventForm.value.dateTo;
        newEvent.description = this.eventForm.value.description;
        newEvent.price = this.eventForm.value.price;
        this._dialogRef.close(newEvent);
    }
}
