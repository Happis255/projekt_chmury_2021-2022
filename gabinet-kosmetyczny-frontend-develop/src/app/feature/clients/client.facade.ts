import { AccountFacade } from "./../account/account.facade";
import { IClientData } from "./model/client.model";
import { ClientState } from "./state/client.state";
import { ClientApi } from "./api/client.api";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUser } from "src/app/core/auth/model/user.interface";
import { INewClientMessage } from "./model/client-message.interface";

@Injectable()
export class ClientFacade {
    constructor(
        private _clientApi: ClientApi,
        private _clientState: ClientState,
        private _accountFacade: AccountFacade
    ) { }

    public loadClientList(): void {
        this._clientApi.getClientsData().toPromise()
            .then((list: IClientData[]) => {
                this._clientState.setClientList(list);
            });
    }

    public getClientList(): Observable<IClientData[]> {
        return this._clientState.getClientList$();
    }

    public removeClient(clientUuid: string): void {
        this._clientApi.deleteClientData(clientUuid).then(() => {
            this.loadClientList();
        });
    }

    public addClient(result: IClientData): void {
        this._clientApi.addClientData(result).then(() => {
            this.loadClientList();
        });
    }

    public editClient(result: IClientData): void {
        this._clientApi.editClientData(result).then(() => {
            this.loadClientList();
        });
    }

    public loadEmails(): void {
        this._clientApi.getEmails()
            .toPromise()
            .then((list: string[]) => {
                this._clientState.setEmails(list);
            });
    }

    public sendMessagesClients(message: INewClientMessage): void {
        this._clientApi.sendEmailToClient(message).toPromise();
    }

    public getEmails(): Observable<string[]> {
        return this._clientState.getEmails$();
    }

    public getUserData(): IUser {
        return this._accountFacade.getUserData();
    }
}
