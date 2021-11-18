import { IClientData } from "./../model/client.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class ClientState {
    private _clientList = new BehaviorSubject<IClientData[]>(null);
    private _emails = new BehaviorSubject<string[]>(null);

    public getClientList$(): Observable<IClientData[]> {
        return this._clientList.asObservable();
    }

    public setClientList(clientList: IClientData[]): void {
        this._clientList.next(clientList);
    }

    public getEmails$(): Observable<string[]> {
        return this._emails.asObservable();
    }

    public setEmails(emails: string[]): void {
        this._emails.next(emails);
    }
}
