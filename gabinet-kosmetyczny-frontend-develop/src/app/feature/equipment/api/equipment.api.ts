import { IEquipment } from "./../model/equipment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class EquipmentApi {
    constructor(
        private http: HttpClient
    ) { }

    public loadEquipmentList(): Observable<IEquipment[]> {
        return this.http.get<any>(environment.api + "admin/equipments");
    }

    public markAsChecked(uuid: string): Observable<IEquipment> {
        return this.http.patch<any>(environment.api + "admin/equipment/" + uuid, null);
    }

    public deleteEquipment(uuid: string): Observable<null> {
        return this.http.delete<any>(environment.api + "admin/equipment/" + uuid);
    }

    public addEquipment(newEquipment: IEquipment): Observable<IEquipment> {
        return this.http.put<any>(environment.api + "admin/equipment", newEquipment);
    }

    public editEquipment(equipment: IEquipment): Observable<IEquipment> {
        return this.http.patch<any>(environment.api + "admin/equipment", equipment);
    }
}
