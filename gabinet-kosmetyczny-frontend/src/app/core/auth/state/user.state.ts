import { Injectable } from "@angular/core";
import { IUser } from "../model/user.interface";

@Injectable()
export class UserState {

    private _user: IUser = null;
    constructor() { }

    public setUser(user: IUser): void {
        this._user = user;
    }

    public getUser(): IUser {
        return this._user;
    }

    public clear(): void {
        this._user = null;
    }
}
