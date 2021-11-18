import { IWorkerTask } from "./../../model/task.interface";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
    selector: "app-economic-task-filter",
    templateUrl: "./economic-task-filter.component.html",
    styleUrls: ["./economic-task-filter.component.sass"]
})
export class EconomicTaskFilterComponent implements OnInit {

    @Output()
    public formEventEmitter: EventEmitter<IWorkerTask> = new EventEmitter();

    public economicTaskSearchForm: FormGroup;
    public searchTask: IWorkerTask = {
        title: null,
        workerName: null,
        workerSurname: null
    };

    constructor() { }

    ngOnInit(): void {
        this.economicTaskSearchForm = new FormGroup({
            title: new FormControl(""),
            name: new FormControl(""),
            surname: new FormControl("")
        });
    }

    public search(): void {
        this.searchTask.title = this.economicTaskSearchForm.value.title;
        this.searchTask.workerName = this.economicTaskSearchForm.value.name;
        this.searchTask.workerSurname = this.economicTaskSearchForm.value.surname;
        this.formEventEmitter.emit(this.searchTask);
    }

}
