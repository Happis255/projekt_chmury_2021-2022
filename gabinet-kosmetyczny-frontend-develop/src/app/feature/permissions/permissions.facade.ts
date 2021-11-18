import { ServicesFacade } from "../services/services.facade";
import { Injectable } from "@angular/core";
import { PermissionsState } from "./state/permissions.state";
import { PermissionsApi } from "./api/permissions.api";
import { Observable } from "rxjs/internal/Observable";
import { IWorkerServiceRelation } from "./model/worker-service-relation.model";
import { IServiceRef } from "../services/model/service-ref.model";

@Injectable()
export class PermissionsFacade {

    constructor(
        private _permissionsState: PermissionsState,
        private _permissionsApi: PermissionsApi,
        private _servicesFacade: ServicesFacade
    ) { }

    public loadWorkerServicesRelations(): void {
        this._permissionsApi.getWorkerServicesRelations()
            .toPromise()
            .then((relationList: IWorkerServiceRelation[]) =>
                this._permissionsState.setWorkersList(relationList)
            );
    }

    public editWorkerServicesRelations(relation: IWorkerServiceRelation): Promise<any> {
        return this._permissionsApi.editWorkerServicesRelations(relation).toPromise();
    }

    public getWorkersList$(): Observable<IWorkerServiceRelation[]> {
        return this._permissionsState.getWorkersList$();
    }

    public setWorkersList(workerServicesList: IWorkerServiceRelation[]): void {
        this._permissionsState.setWorkersList(workerServicesList);
    }

    public loadServicesListRef(): void {
        this._servicesFacade.loadServiceListRef();
    }

    public getServicesListRef$(): Observable<IServiceRef[]> {
        return this._servicesFacade.getServicesListRef$();
    }
}
