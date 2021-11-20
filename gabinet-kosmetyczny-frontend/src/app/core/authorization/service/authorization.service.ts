import { Injectable } from "@angular/core";
import { AuthFacade } from "../../auth/auth.facade";

@Injectable({
    providedIn: "root"
})
export class AuthorizationService {
    public userPriviliges: string;

    constructor(private _authFacade: AuthFacade) { }

    public userHasAccess(permission: string): boolean {
        this.userPriviliges = this._authFacade.getPrivilige();

        return permission === this.userPriviliges;
    }
}
