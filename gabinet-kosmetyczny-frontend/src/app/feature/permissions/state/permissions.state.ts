import { IWorkerServiceRelation } from "../model/worker-service-relation.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class PermissionsState {
    private _workerServiceRelations = new BehaviorSubject<IWorkerServiceRelation[]>(null);

    public getWorkersList$(): Observable<IWorkerServiceRelation[]> {
        return this._workerServiceRelations.asObservable();
    }

    public setWorkersList(workerServicesList: IWorkerServiceRelation[]): void {
        this._workerServiceRelations.next(workerServicesList);
    }
}
