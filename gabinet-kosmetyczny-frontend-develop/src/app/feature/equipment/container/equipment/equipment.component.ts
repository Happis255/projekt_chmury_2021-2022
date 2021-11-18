import { EditEquipmentModalComponent } from './../../component/edit-equipment-modal/edit-equipment-modal.component';
import { AddNewEquipmentModalComponent } from './../../component/add-new-equipment-modal/add-new-equipment-modal.component';
import { EquipmentFacade } from "./../../equipment.facade";
import { IEquipment } from "./../../model/equipment";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { MessageBoxComponent } from 'src/app/shared/message-box/component/message-box/message-box.component';

@Component({
    selector: "app-equipment",
    templateUrl: "./equipment.component.html",
    styleUrls: ["./equipment.component.sass"]
})
export class EquipmentComponent implements OnInit, OnDestroy {

    @ViewChild("MatSortEquipment")
    public matSortEquipment: MatSort;

    @ViewChild("MatPaginatorEquipment")
    public matPaginatorEquipment: MatPaginator;

    public tableDisplayedColumns: string[] = ["name", "description", "getDate", "warrantyDate", "lastCheckDate", "comments", "actions"];
    public tableSource: MatTableDataSource<IEquipment>;
    public subscriptionTable: Subscription[] = [];

    constructor(
        private _equipmentFacade: EquipmentFacade,
        private _dialog: MatDialog,
        private _translate: TranslateService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._equipmentFacade.loadEquipmentList();
        this.subscriptionTable.push(
            this._equipmentFacade.getEquipmentList().subscribe(
                (equipment: IEquipment[]) => {
                    if (equipment) {
                        this.tableSource = new MatTableDataSource(equipment);
                        this.tableSource.sort = this.matSortEquipment;
                        if (equipment.length > 0) {
                            this.tableSource.paginator = this.matPaginatorEquipment;
                        }
                    }
                }
            )
        );
        this._checkUrlIfToOpenModal();
    }

    ngOnDestroy(): void {
        this.subscriptionTable.forEach((subscription: Subscription) => subscription.unsubscribe());
    }

    private _checkUrlIfToOpenModal(): void {
        if (this._router.url.includes("add-new")) {
            this.addNewEquipment();
        }
    }

    public addNewEquipment(): void {
        const dialogRef = this._dialog.open(AddNewEquipmentModalComponent, {
            disableClose: true
        });
        dialogRef.afterClosed().subscribe((newEquipment: IEquipment) => {
            if (newEquipment) {
                this._equipmentFacade.addNewEquipment(newEquipment).then(() => {
                    this._equipmentFacade.loadEquipmentList();
                });
            }
        });
    }

    public removeEquipment(equipment: IEquipment): void {
        const message = this._translate.instant("shared.delete-equipment");
        this._dialog.open(MessageBoxComponent, {
            data: {
                message,
                confirmButton: true,
                cancelButton: true
            }
        }).afterClosed().subscribe(result => {
            if (result) {
                this._equipmentFacade.deleteEquipment(equipment.uuid).then(() => {
                    this._equipmentFacade.loadEquipmentList();
                });
            }
        });
    }

    public editEquipment(equipment: IEquipment): void {
        const dialogRef = this._dialog.open(EditEquipmentModalComponent, {
            disableClose: true
        });
        dialogRef.componentInstance.equipment = equipment;
        dialogRef.afterClosed().subscribe((equipment: IEquipment) => {
            if (equipment) {
                this._equipmentFacade.editEquipment(equipment).then(() => {
                    this._equipmentFacade.loadEquipmentList();
                });
            }
        });
    }

    public markAsChecked(equipment: IEquipment): void {
        this._equipmentFacade.markAsChecked(equipment.uuid).then(() => {
            this._equipmentFacade.loadEquipmentList();
        });
    }
}
