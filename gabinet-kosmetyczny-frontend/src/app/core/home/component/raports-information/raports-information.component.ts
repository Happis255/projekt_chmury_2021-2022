import { Component, Input, OnInit, ViewChild, AfterViewInit, OnChanges } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { IMachineReport } from "../../model/machine-report.interface";
import { IReport } from "../../model/report.interface";
import { ITrashesReport } from "../../model/trashes-report.interface";

@Component({
    selector: "app-raports-information",
    templateUrl: "./raports-information.component.html",
    styleUrls: ["./raports-information.component.sass"]
})
export class RaportsInformationComponent implements OnInit, AfterViewInit, OnChanges {

    @ViewChild("MatSortAll")
    public sortAll: MatSort;

    @ViewChild("MatSortTrashes")
    public sortTrashes: MatSort;

    @ViewChild("MatSortMachines")
    public sortMachines: MatSort;

    @ViewChild("MatPagAll")
    public pagAll: MatPaginator;

    @ViewChild("MatPagTrashes")
    public pagTrashes: MatPaginator;

    @ViewChild("MatPagMachines")
    public pagMachines: MatPaginator;

    @Input()
    public reportsTab: IReport[] = [];

    @Input()
    public trashesReportsTab: ITrashesReport[] = [];

    @Input()
    public machineReportsTab: IMachineReport[] = [];

    public tableReportsTab: MatTableDataSource<IReport>;
    public tableTrashesReportsTab: MatTableDataSource<ITrashesReport>;
    public tableMachineReportsTab: MatTableDataSource<IMachineReport>;
    public tableReportsTabColumns: string[] = ["title", "type", "date", "name", "surname"];
    public tableTrashesReportsTabColumns: string[] = ["title", "date", "name", "surname", "type", "amount", "cost"];
    public tableMachineReportsTabColumns: string[] = ["title", "date", "name", "surname"];

    public checkIfToday(date: Date): boolean {
        const utc = new Date();
        const valueDay = utc.getDate();
        let day;
        if (valueDay < 10) {
            day = "" + "0" + valueDay;
        } else {
            day = "" + valueDay;
        }
        const valueMonth = utc.getMonth() + 1;
        let month;
        if (valueMonth < 10) {
            month = "" + "0" + valueMonth;
        } else {
            month = "" + valueMonth;
        }
        const fullDate: string = "" + utc.getFullYear() + "-" + month + "-" + day;

        return fullDate === date.valueOf().toString();
    }

    ngOnInit(): void {
        this.tableReportsTab = new MatTableDataSource(this.reportsTab);
        this.tableTrashesReportsTab = new MatTableDataSource(this.trashesReportsTab);
        this.tableMachineReportsTab = new MatTableDataSource(this.machineReportsTab);
    }

    ngAfterViewInit(): void {
        this._reload();
    }

    ngOnChanges(): void {
        this.tableReportsTab = new MatTableDataSource(this.reportsTab);
        this.tableTrashesReportsTab = new MatTableDataSource(this.trashesReportsTab);
        this.tableMachineReportsTab = new MatTableDataSource(this.machineReportsTab);
        this._reload();
    }

    private _reload(): void {
        this.tableReportsTab.sort = this.sortAll;
        this.tableTrashesReportsTab.sort = this.sortTrashes;
        this.tableMachineReportsTab.sort = this.sortMachines;
        if (this.reportsTab?.length > 0) {
            this.tableReportsTab.paginator = this.pagAll;
        }
        if (this.trashesReportsTab?.length > 0) {
            this.tableTrashesReportsTab.paginator = this.pagTrashes;
        }
        if (this.machineReportsTab?.length > 0) {
            this.tableMachineReportsTab.paginator = this.pagMachines;
        }
    }

}
