import { IWorkerServiceRelation } from "../model/worker-service-relation.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class PermissionsApi {

    constructor(
        private http: HttpClient
    ) { }

    public getWorkerServicesRelations(): Observable<IWorkerServiceRelation[]> {
        return this.http.get<any>(environment.api + "admin/premissions");
    }

    public editWorkerServicesRelations(relation: IWorkerServiceRelation): Observable<IWorkerServiceRelation> {
        return this.http.patch<any>(environment.api + "admin/premissions", relation);
    }
}
