import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IEquipment } from "../model/equipment";

@Injectable()
export class EquipmentState {
    private _equipmentList = new BehaviorSubject<any[]>(null);

    public setEquipmentList(equipment: IEquipment[]): void {
        this._equipmentList.next(equipment);
    }

    public getEquipmentList(): Observable<IEquipment[]> {
        return this._equipmentList.asObservable();
    }
}
