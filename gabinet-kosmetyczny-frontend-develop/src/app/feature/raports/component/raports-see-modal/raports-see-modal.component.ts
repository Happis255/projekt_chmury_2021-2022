import { IReport } from "./../../../../core/home/model/report.interface";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: "app-raports-see-modal",
    templateUrl: "./raports-see-modal.component.html",
    styleUrls: ["./raports-see-modal.component.sass"]
})
export class RaportsSeeModalComponent implements OnInit {

    @Input()
    public raport: IReport;

    public raportForm: FormGroup;

    constructor() { }

    ngOnInit(): void {
        this.raportForm = new FormGroup({
            title: new FormControl({ value: this.raport.title, disabled: true }, [Validators.required]),
            description: new FormControl({ value: this.raport.description, disabled: true }, [Validators.required]),
            date: new FormControl({ value: this.raport.date, disabled: true }, [Validators.required]),
            type: new FormControl({ value: this.raport.type, disabled: true }, [Validators.required]),
            worker: new FormControl(
                { value: this.raport.name + " " + this.raport.surname, disabled: true },
                [Validators.required]
            )
        });
    }
}
