import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IMachineReport } from "src/app/core/home/model/machine-report.interface";
import { IReport } from "src/app/core/home/model/report.interface";
import { ITrashesReport } from "src/app/core/home/model/trashes-report.interface";
import { environment } from "src/environments/environment";

@Injectable()
export class RaportsApi {
    constructor(
        private http: HttpClient
    ) { }

    public getAllTrashesReportsWithUsersName(): Observable<ITrashesReport[]> {
        return this.http.get<any>(environment.api + "admin/reports/trashes-reports");
    }

    public getAllReportsWithUserName(): Observable<IReport[]> {
        return this.http.get<any>(environment.api + "admin/reports");
    }

    public getAllMachineReportsWithUserName(): Observable<IMachineReport[]> {
        return this.http.get<any>(environment.api + "admin/reports/machine-reports");
    }

    public removeMachineRaport(uuid: string): Observable<any> {
        return this.http.delete<any>(environment.api + "admin/reports/machine-reports/" + uuid);
    }

    public removeRaport(uuid: string): Observable<any> {
        return this.http.delete<any>(environment.api + "admin/reports/" + uuid);
    }

    public removeTrashesRaport(uuid: string): Observable<any> {
        return this.http.delete<any>(environment.api + "admin/reports/trashes-reports/" + uuid);
    }

    public addNewRaport(newRaport: IReport): Observable<any> {
        return this.http.put<any>(environment.api + "admin/reports", newRaport);
    }

    public addNewMachineRaport(newRaport: IMachineReport): Observable<any> {
        return this.http.put<any>(environment.api + "admin/reports/machine-reports", newRaport);
    }

    public addNewTrashesRaport(newRaport: ITrashesReport): Observable<any> {
        return this.http.put<any>(environment.api + "admin/reports/trashes-reports", newRaport);
    }
}
