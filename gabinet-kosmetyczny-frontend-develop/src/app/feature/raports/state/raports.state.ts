import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IMachineReport } from "src/app/core/home/model/machine-report.interface";
import { IReport } from "src/app/core/home/model/report.interface";
import { ITrashesReport } from "src/app/core/home/model/trashes-report.interface";

@Injectable()
export class RaportsState {

    private _reportsTab = new BehaviorSubject<IReport[]>(null);
    private _trashesReportsTab = new BehaviorSubject<ITrashesReport[]>(null);
    private _machineReportsTab = new BehaviorSubject<IMachineReport[]>(null);

    public setReports(reports: IReport[]): void {
        this._reportsTab.next(reports);
    }

    public getReports$(): Observable<IReport[]> {
        return this._reportsTab.asObservable();
    }

    public setTrashesReports(productForUse: ITrashesReport[]): void {
        this._trashesReportsTab.next(productForUse);
    }

    public getTrashesReports$(): Observable<ITrashesReport[]> {
        return this._trashesReportsTab.asObservable();
    }

    public setMachineReports(machineReportsTab: IMachineReport[]): void {
        this._machineReportsTab.next(machineReportsTab);
    }

    public getMachineReports$(): Observable<IMachineReport[]> {
        return this._machineReportsTab.asObservable();
    }
}
