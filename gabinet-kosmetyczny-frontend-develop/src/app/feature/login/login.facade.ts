import { IUserLoggedIn } from "./model/user-logged.interface";
import { LoginApi } from "./api/login.api";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthFacade } from "src/app/core/auth/auth.facade";
import { IUser } from "src/app/core/auth/model/user.interface";
import { IUserLogin } from "./model/user-login.interface";

@Injectable()
export class LoginFacade {

    constructor(
        private _auth: AuthFacade,
        private _router: Router,
        private _loginApi: LoginApi
    ) { }

    public loginInUser(userLoginInfo: IUserLogin): Promise <boolean> {
        return this._loginApi.loginRequest(userLoginInfo).toPromise().then((response: IUserLoggedIn) => {
            if (response) {
                this._saveUser({
                    userUuid: response.userUuid,
                    accountUuid: response.accountUuid,
                    email: response.email,
                    role: response.role,
                    name: response.name,
                    surname: response.surname
                });
            }
        }).catch(() => {
            return false;
        }).then(() => {
            return true;
        });
    }

    public remindPassword(email: string): boolean {
        this._loginApi.remindPassword(email);

        return true;
    }

    private _saveUser(user: IUser): void {
        this._auth.setUser(user);
        this._redirectToApp();
    }

    private _redirectToApp(): void {
        this._router.navigate(["/dashboard"]);
    }

    public checkIfUserLoggedIn(): void {
        if (this._auth.loggedIn()) {
            this._redirectToApp();
        }
    }
}
