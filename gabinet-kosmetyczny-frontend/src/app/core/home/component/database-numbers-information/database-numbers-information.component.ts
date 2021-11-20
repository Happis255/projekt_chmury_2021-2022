import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-database-numbers-information",
    templateUrl: "./database-numbers-information.component.html",
    styleUrls: ["./database-numbers-information.component.sass"]
})
export class DatabaseNumbersInformationComponent implements OnInit {

    @Input()
    workersAmount: number;

    @Input()
    clientsAmount: number;

    @Input()
    visitsAmount: number;

    @Input()
    visitsThisMonthAmount: number;

    constructor() { }

    ngOnInit(): void {
    }

}
