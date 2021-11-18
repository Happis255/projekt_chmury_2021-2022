import { IServiceRef } from "./../../../services/model/service-ref.model";
import { Subscription } from "rxjs";
import { PermissionsFacade } from "./../../permissions.facade";
import { IWorkerServiceRelation } from "./../../model/worker-service-relation.model";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { WorkerServiceViewModalComponent } from "../../component/worker-service-view-modal/worker-service-view-modal.component";
import { WorkerServiceEditModalComponent } from "../../component/worker-service-edit-modal/worker-service-edit-modal.component";

@Component({
    selector: "app-permissions",
    templateUrl: "./permissions.component.html",
    styleUrls: ["./permissions.component.sass"]
})
export class PermissionsComponent implements OnInit {

    public workerServiceRelationList: IWorkerServiceRelation[];
    public workerServiceRelationListSubscription: Subscription;
    public serviceListSubscription: Subscription;

    constructor(
        private _permissionsFacade: PermissionsFacade,
        private _dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this._permissionsFacade.loadWorkerServicesRelations();
        this.workerServiceRelationListSubscription = this._permissionsFacade
            .getWorkersList$()
            .subscribe((workerServiceRelationList: IWorkerServiceRelation[]) =>
                this.workerServiceRelationList = workerServiceRelationList
            );
    }

    public viewWorkerPremissions(workerServiceRelationList: IWorkerServiceRelation): void {
        const dialogRef = this._dialog.open(WorkerServiceViewModalComponent, {
            disableClose: true,
            width: "30em"
        });
        dialogRef.componentInstance.workerServiceRelationList = workerServiceRelationList;
        this._permissionsFacade.loadServicesListRef();
        this.serviceListSubscription = this._permissionsFacade.getServicesListRef$()
            .subscribe((serviceRefList: IServiceRef[]) => {
                dialogRef.componentInstance.serviceRefList = serviceRefList;
            });
        dialogRef.afterClosed().subscribe(() => {
            this.serviceListSubscription.unsubscribe();
        });
    }

    public editWorkerPremissions(workerServiceRelationList: IWorkerServiceRelation): void {
        const dialogRef = this._dialog.open(WorkerServiceEditModalComponent, {
            disableClose: true,
            width: "30em"
        });
        dialogRef.componentInstance.workerServiceRelationList = workerServiceRelationList;
        this._permissionsFacade.loadServicesListRef();
        this.serviceListSubscription = this._permissionsFacade.getServicesListRef$()
            .subscribe((serviceRefList: IServiceRef[]) => {
                dialogRef.componentInstance.serviceRefList = serviceRefList;
            });
        dialogRef.afterClosed().subscribe((newRelation: IWorkerServiceRelation) => {
            if (newRelation) {
                this._permissionsFacade.editWorkerServicesRelations(newRelation).then(() => {
                    this._permissionsFacade.loadWorkerServicesRelations();
                });
            }
            this.serviceListSubscription.unsubscribe();
        });
    }
}
