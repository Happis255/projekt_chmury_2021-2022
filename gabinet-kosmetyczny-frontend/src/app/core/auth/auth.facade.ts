import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IUser } from "./model/user.interface";
import { environment } from "src/environments/environment";
import { UserState } from "./state/user.state";

@Injectable()
export class AuthFacade {

    public user: IUser;

    constructor(
        private _state: UserState,
        private _router: Router,
    ) { }

    public loggedIn(): boolean {
        return !!this.getUser();
    }

    public setUser(user: IUser): void {
        this._state.setUser(user);
        this.upateLocalStorage(this._state.getUser());
    }

    public getUser(): IUser {
        return this._state.getUser();
    }

    public clearUser(): void {
        this._state.clear();
    }

    public onClearSession(): void {
        this.clearUser();
        this.clearLocalStorage();
        this._router.navigate(["/login"]);
    }

    public upateLocalStorage(user: IUser): void {
        localStorage.setItem(environment.APP_PREFIX + "userUuid", user.userUuid);
        localStorage.setItem(environment.APP_PREFIX + "accountUuid", user.accountUuid);
        localStorage.setItem(environment.APP_PREFIX + "email", user.email);
        localStorage.setItem(environment.APP_PREFIX + "role", user.role);
        localStorage.setItem(environment.APP_PREFIX + "name", user.name);
        localStorage.setItem(environment.APP_PREFIX + "surname", user.surname);
    }

    public getLocalStorageData(): IUser {
        return {
            userUuid: localStorage.getItem(environment.APP_PREFIX + "userUuid"),
            accountUuid: localStorage.getItem(environment.APP_PREFIX + "accountUuid"),
            email:  localStorage.getItem(environment.APP_PREFIX + "email"),
            role: localStorage.getItem(environment.APP_PREFIX + "role"),
            name: localStorage.getItem(environment.APP_PREFIX + "name"),
            surname: localStorage.getItem(environment.APP_PREFIX + "surname")
        };
    }

    public clearLocalStorage(): void {
        localStorage.removeItem(environment.APP_PREFIX + "userUuid");
        localStorage.removeItem(environment.APP_PREFIX + "accountUuid");
        localStorage.removeItem(environment.APP_PREFIX + "email");
        localStorage.removeItem(environment.APP_PREFIX + "role");
        localStorage.removeItem(environment.APP_PREFIX + "name");
        localStorage.removeItem(environment.APP_PREFIX + "surname");
    }

    public getPrivilige(): string {
        return this.getUser().role;
    }
}
