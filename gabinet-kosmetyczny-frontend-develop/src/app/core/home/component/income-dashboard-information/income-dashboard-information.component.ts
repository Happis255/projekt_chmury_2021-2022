import { Component, Input, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { IIncomeAmountMonths } from "../../model/income-amount-months.interface";
import { IIncomeAmountWorker } from "../../model/income-amount-worker.interface";

@Component({
    selector: "app-income-dashboard-information",
    templateUrl: "./income-dashboard-information.component.html",
    styleUrls: ["./income-dashboard-information.component.sass"]
})
export class IncomeDashboardInformationComponent implements OnInit, AfterViewInit {

    @Input()
    public incomeAmountWorkerData: IIncomeAmountWorker[];

    @Input()
    public incomeAmountMonthsData: IIncomeAmountMonths[];

    @ViewChild("MatSortAmountWorker")
    public sortAmountWorker: MatSort;

    @ViewChild("MatSortAmountMonths")
    public sortAmountMonths: MatSort;

    public tableWorkerIncomeSource: MatTableDataSource<IIncomeAmountWorker>;
    public tableServicesIncomeSource: MatTableDataSource<IIncomeAmountMonths>;
    public tableWorkeDisplayedColumns: string[] = ["name", "surname", "amount"];
    public tableServicesDisplayedColumns: string[] = ["month", "year", "amount"];

    constructor() { }

    ngOnInit(): void {
        this.tableWorkerIncomeSource = new MatTableDataSource(this.incomeAmountWorkerData);
        this.tableServicesIncomeSource = new MatTableDataSource(this.incomeAmountMonthsData);
    }

    ngAfterViewInit(): void {
        this.tableWorkerIncomeSource.sort = this.sortAmountWorker;
        this.tableServicesIncomeSource.sort = this.sortAmountMonths;
    }

}
