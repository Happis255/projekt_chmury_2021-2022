import { Observable } from "rxjs";
import { IEquipment } from "./model/equipment";
import { EquipmentState } from "./state/equipment.state";
import { EquipmentApi } from "./api/equipment.api";
import { Injectable } from "@angular/core";

@Injectable()
export class EquipmentFacade {
    constructor(
        private _equipmentApi: EquipmentApi,
        private _equipmentState: EquipmentState
    ) { }

    public loadEquipmentList(): void {
        this._equipmentApi.loadEquipmentList()
            .toPromise()
            .then((equipment: IEquipment[]) => {
                this._equipmentState.setEquipmentList(equipment);
            });
    }

    public markAsChecked(uuid: string): Promise<any> {
        return this._equipmentApi.markAsChecked(uuid).toPromise();
    }

    public getEquipmentList(): Observable<IEquipment[]> {
        return this._equipmentState.getEquipmentList();
    }

    public deleteEquipment(uuid: string): Promise<any> {
        return this._equipmentApi.deleteEquipment(uuid).toPromise();
    }

    public addNewEquipment(newEquipment: IEquipment): Promise<any> {
        return this._equipmentApi.addEquipment(newEquipment).toPromise();
    }

    public editEquipment(equipment: IEquipment): Promise<any> {
        return this._equipmentApi.editEquipment(equipment).toPromise();
    }
}
