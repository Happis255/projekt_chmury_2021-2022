import { AuthFacade } from "./../../core/auth/auth.facade";
import { RaportsState } from "./state/raports.state";
import { RaportsApi } from "./api/raports.api";
import { Injectable } from "@angular/core";
import { IMachineReport } from "src/app/core/home/model/machine-report.interface";
import { IReport } from "src/app/core/home/model/report.interface";
import { ITrashesReport } from "src/app/core/home/model/trashes-report.interface";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class RaportsFacade {
    constructor(
        private _raportsApi: RaportsApi,
        private _raportsState: RaportsState,
        private _authFacade: AuthFacade
    ) { }

    public getAllTrashesReportsWithUsersName(): void {
        this._raportsApi.getAllTrashesReportsWithUsersName()
            .toPromise()
            .then((reports: ITrashesReport[]) => {
                this._raportsState.setTrashesReports(reports);
            });
    }

    public getAllReportsWithUserName(): void {
        this._raportsApi.getAllReportsWithUserName()
            .toPromise()
            .then((reports: IReport[]) => {
                this._raportsState.setReports(reports);
            });
    }

    public getAllMachineReportsWithUserName(): void {
        this._raportsApi.getAllMachineReportsWithUserName()
            .toPromise()
            .then((reports: IMachineReport[]) => {
                this._raportsState.setMachineReports(reports);
            });
    }

    public getReports$(): Observable<IReport[]> {
        return this._raportsState.getReports$();
    }

    public getTrashesReports$(): Observable<ITrashesReport[]> {
        return this._raportsState.getTrashesReports$();
    }

    public getMachineReports$(): Observable<IMachineReport[]> {
        return this._raportsState.getMachineReports$();
    }

    public removeMachineRaport(uuid: string): Promise<any> {
        return this._raportsApi.removeMachineRaport(uuid).toPromise();
    }

    public removeRaport(uuid: string): Promise<any> {
        return this._raportsApi.removeRaport(uuid).toPromise();
    }

    public removeTrashesRaport(uuid: string): Promise<any> {
        return this._raportsApi.removeTrashesRaport(uuid).toPromise();
    }

    public addNewRaport(newRaport: IReport): Promise<any> {
        newRaport.workerUuid = this._authFacade.getLocalStorageData().userUuid;

        return this._raportsApi.addNewRaport(newRaport).toPromise();
    }

    public addMachineRaport(newRaport: IMachineReport): Promise<any> {
        newRaport.workerUuid = this._authFacade.getLocalStorageData().userUuid;

        return this._raportsApi.addNewMachineRaport(newRaport).toPromise();
    }

    public addNewTrashesRaport(newRaport: ITrashesReport): Promise<any> {
        newRaport.workerUuid = this._authFacade.getLocalStorageData().userUuid;

        return this._raportsApi.addNewTrashesRaport(newRaport).toPromise();
    }
}
