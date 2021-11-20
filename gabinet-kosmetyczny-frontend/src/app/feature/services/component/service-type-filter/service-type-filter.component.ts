import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: "app-service-type-filter",
    templateUrl: "./service-type-filter.component.html",
    styleUrls: ["./service-type-filter.component.sass"]
})
export class SerivcesFilterComponent implements OnInit {

    @Input()
    public servicesTypeList: string[];

    @Output()
    public formEventEmitter: EventEmitter<string> = new EventEmitter();

    public servicesFilter: FormGroup;

    constructor() { }

    ngOnInit(): void {
        this.servicesFilter = new FormGroup({
            serviceType: new FormControl("", [Validators.required])
        });
    }

    public search(): void {
        this.formEventEmitter.emit(this.servicesFilter.value.serviceType);
    }
}
