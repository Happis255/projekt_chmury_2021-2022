import { IMachineReport } from "./../../../../core/home/model/machine-report.interface";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-machine-raports-see-modal",
    templateUrl: "./machine-raports-see-modal.component.html",
    styleUrls: ["./machine-raports-see-modal.component.sass"]
})
export class MachineRaportsSeeModalComponent implements OnInit {

    @Input()
    public machineRaport: IMachineReport;

    public machineRaportForm: FormGroup;

    constructor() { }

    ngOnInit(): void {
        this.machineRaportForm = new FormGroup({
            title: new FormControl({ value: this.machineRaport.title, disabled: true }, [Validators.required]),
            description: new FormControl({ value: this.machineRaport.description, disabled: true }, [Validators.required]),
            date: new FormControl({ value: this.machineRaport.date, disabled: true }, [Validators.required]),
            worker: new FormControl(
                { value: this.machineRaport.name + " " + this.machineRaport.surname, disabled: true },
                [Validators.required]
            )
        });
    }
}
