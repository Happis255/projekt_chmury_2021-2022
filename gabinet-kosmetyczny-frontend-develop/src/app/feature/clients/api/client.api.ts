import { IClientData } from "./../model/client.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IClientDataRef } from "../model/client-ref.model";
import { INewClientMessage } from "../model/client-message.interface";

@Injectable()
export class ClientApi {
    constructor(
        private http: HttpClient
    ) { }

    public getClientsData(): Observable<IClientData[]> {
        return this.http.get<any>(environment.api + "worker/clients");
    }

    public addClientData(clientData: IClientData): Promise<any> {
        return this.http.put<any>(environment.api + "worker/client", clientData).toPromise();
    }

    public editClientData(clientData: IClientData): Promise<any> {
        return this.http.patch<any>(environment.api + "worker/client", clientData).toPromise();
    }

    public deleteClientData(clientUuid: string): Promise<void> {
        return this.http.delete<any>(environment.api + "worker/client/" + clientUuid).toPromise();
    }

    public getEmails(): Observable<string[]> {
        return this.http.get<any>(environment.api + "admin/accounts/emails");
    }

    public sendEmailToClient(message: INewClientMessage): Observable<void> {
        return this.http.put<any>(environment.api + "worker/client/send-messages", message);
    }
}
