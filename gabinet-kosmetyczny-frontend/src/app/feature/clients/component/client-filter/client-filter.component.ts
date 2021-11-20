import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { IClientData } from "./../../model/client.model";

@Component({
    selector: "app-client-filter",
    templateUrl: "./client-filter.component.html",
    styleUrls: ["./client-filter.component.sass"]
})
export class ClientFilterComponent implements OnInit {

    @Output()
    public formEventEmitter: EventEmitter<IClientData> = new EventEmitter();

    public clientSearchFilterForm: FormGroup;
    public searchClient: IClientData = {
        name: null,
        surname: null
    };

    constructor() { }

    ngOnInit(): void {
        this.clientSearchFilterForm = new FormGroup({
            name: new FormControl(""),
            surname: new FormControl("")
        });
    }

    public search(): void {
        this.searchClient.name = this.clientSearchFilterForm.value.name;
        this.searchClient.surname = this.clientSearchFilterForm.value.surname;
        this.formEventEmitter.emit(this.searchClient);
    }

}
