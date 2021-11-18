import { RaportsAddModalComponent } from "./../../component/raports-add-modal/raports-add-modal.component";
import { RaportsSeeModalComponent } from "./../../component/raports-see-modal/raports-see-modal.component";
import { Subscription } from "rxjs";
import { RaportsFacade } from "./../../raports.facade";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { IMachineReport } from "src/app/core/home/model/machine-report.interface";
import { IReport } from "src/app/core/home/model/report.interface";
import { ITrashesReport } from "src/app/core/home/model/trashes-report.interface";
import { MatDialog } from "@angular/material/dialog";
import { MachineRaportsSeeModalComponent } from "../../component/machine-raports-see-modal/machine-raports-see-modal.component";
import { MessageBoxComponent } from "src/app/shared/message-box/component/message-box/message-box.component";
import { TranslateService } from "@ngx-translate/core";
import { RaportAddTrashesModalComponent } from "../../component/raport-add-trashes-modal/raport-add-trashes-modal.component";
import { RaportAddMachineModalComponent } from "../../component/raport-add-machine-modal/raport-add-machine-modal.component";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';

@Component({
    selector: "app-raports",
    templateUrl: "./raports.component.html",
    styleUrls: ["./raports.component.sass"]
})
export class RaportsComponent implements OnInit, OnDestroy {

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

    public reportsTab: IReport[] = [];
    public trashesReportsTab: ITrashesReport[] = [];
    public machineReportsTab: IMachineReport[] = [];

    public tableReportsTab: MatTableDataSource<IReport>;
    public tableTrashesReportsTab: MatTableDataSource<ITrashesReport>;
    public tableMachineReportsTab: MatTableDataSource<IMachineReport>;
    public tableReportsTabColumns: string[] = ["title", "type", "date", "name", "surname", "actions"];
    public tableTrashesReportsTabColumns: string[] = ["title", "date", "name", "surname", "type", "amount", "cost", "actions"];
    public tableMachineReportsTabColumns: string[] = ["title", "date", "name", "surname", "actions"];
    public subscriptionTable: Subscription[] = [];
    public userRole = localStorage.getItem(environment.APP_PREFIX + "role");

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

    constructor(
        private _raportsFacade: RaportsFacade,
        private _dialog: MatDialog,
        private _translate: TranslateService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._raportsFacade.getAllMachineReportsWithUserName();
        this._raportsFacade.getAllReportsWithUserName();
        this._raportsFacade.getAllTrashesReportsWithUsersName();
        this.subscriptionTable.push(
            this._raportsFacade.getMachineReports$().subscribe((raports: IMachineReport[]) => {
                this.machineReportsTab = raports;
                this.tableMachineReportsTab = new MatTableDataSource(this.machineReportsTab);
                this.tableMachineReportsTab.paginator = this.pagMachines;
                this.tableMachineReportsTab.sort = this.sortMachines;
            })
        );
        this.subscriptionTable.push(
            this._raportsFacade.getReports$().subscribe((raports: IReport[]) => {
                this.reportsTab = raports;
                this.tableReportsTab = new MatTableDataSource(this.reportsTab);
                this.tableReportsTab.sort = this.sortAll;
                this.tableReportsTab.paginator = this.pagAll;
            })
        );
        this.subscriptionTable.push(
            this._raportsFacade.getTrashesReports$().subscribe((raports: ITrashesReport[]) => {
                this.trashesReportsTab = raports;
                this.tableTrashesReportsTab = new MatTableDataSource(this.trashesReportsTab);
                this.tableTrashesReportsTab.sort = this.sortTrashes;
                this.tableTrashesReportsTab.paginator = this.pagTrashes;
            })
        );
        this._checkUrlIfToOpenModal();
    }

    ngOnDestroy(): void {
        this.subscriptionTable.forEach((subscription: Subscription) => subscription.unsubscribe());
    }

    private _checkUrlIfToOpenModal(): void {
        if (this._router.url.includes("add-new")) {
            this.addNewRaport();
        }
    }

    public addNewRaport(): void {
        const dialogRef = this._dialog.open(RaportsAddModalComponent, {
            disableClose: true
        });
        dialogRef.afterClosed().subscribe((newRaport: IReport) => {
            if (newRaport) {
                this._raportsFacade.addNewRaport(newRaport).then(() => {
                    this._raportsFacade.getAllReportsWithUserName();
                });
            }
        });
    }

    public addNewMachineRaport(): void {
        const dialogRef = this._dialog.open(RaportAddMachineModalComponent, {
            disableClose: true,
            width: "28em"
        });
        dialogRef.afterClosed().subscribe((newRaport: IMachineReport) => {
            if (newRaport) {
                this._raportsFacade.addMachineRaport(newRaport).then(() => {
                    this._raportsFacade.getAllMachineReportsWithUserName();
                });
            }
        });
    }

    public addTrashesRaport(): void {
        const dialogRef = this._dialog.open(RaportAddTrashesModalComponent, {
            disableClose: true
        });
        dialogRef.afterClosed().subscribe((newRaport: ITrashesReport) => {
            if (newRaport) {
                this._raportsFacade.addNewTrashesRaport(newRaport).then(() => {
                    this._raportsFacade.getAllTrashesReportsWithUsersName();
                });
            }
        });
    }

    public viewMachineRaport(machineRaport: IMachineReport): void {
        const dialogRef = this._dialog.open(MachineRaportsSeeModalComponent, {
            disableClose: true
        });
        dialogRef.componentInstance.machineRaport = machineRaport;
    }

    public viewRaport(raport: IReport): void {
        const dialogRef = this._dialog.open(RaportsSeeModalComponent, {
            disableClose: true
        });
        dialogRef.componentInstance.raport = raport;
    }

    public deleteRaport(report: IReport): void {
        const message = this._translate.instant("shared.delete-raport");
        this._dialog.open(MessageBoxComponent, {
            data: {
                message,
                confirmButton: true,
                cancelButton: true
            }
        }).afterClosed().subscribe(result => {
            if (result) {
                this._raportsFacade.removeRaport(report.uuid).then(() => {
                    this._raportsFacade.getAllReportsWithUserName();
                });
            }
        });
    }

    public deleteMachineRaport(machineRaport: IMachineReport): void {
        const message = this._translate.instant("shared.delete-raport");
        this._dialog.open(MessageBoxComponent, {
            data: {
                message,
                confirmButton: true,
                cancelButton: true
            }
        }).afterClosed().subscribe(result => {
            if (result) {
                this._raportsFacade.removeMachineRaport(machineRaport.uuid).then(() => {
                    this._raportsFacade.getAllMachineReportsWithUserName();
                });
            }
        });
    }

    public deleteTrashesRaport(TrashesRaport: ITrashesReport): void {
        const message = this._translate.instant("shared.delete-raport");
        this._dialog.open(MessageBoxComponent, {
            data: {
                message,
                confirmButton: true,
                cancelButton: true
            }
        }).afterClosed().subscribe(result => {
            if (result) {
                this._raportsFacade.removeTrashesRaport(TrashesRaport.uuid).then(() => {
                    this._raportsFacade.getAllTrashesReportsWithUsersName();
                });
            }
        });
    }
}
