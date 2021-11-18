import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { AuthFacade } from "./auth.facade";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private _auth: AuthFacade,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this._router.url === "/") {
            return this._router.parseUrl("/login");
        }
        if (this._auth.loggedIn()) {
            if (this._auth.getLocalStorageData().role &&
                (this._auth.getLocalStorageData().role === "ADMIN" || this._auth.getLocalStorageData().role === "WORKER")
            ) {

                return true;
            } else {
                this._auth.onClearSession();

                return this._router.parseUrl("/login");
            }
        } else {
            return this._router.parseUrl("/login");
        }
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this._router.url === "/") {
            return this._router.parseUrl("/login");
        }
        if (this._auth.loggedIn()) {
            if (this._auth.getLocalStorageData().role) {

                return true;
            } else {
                this._auth.onClearSession();

                return this._router.parseUrl("/login");
            }
        } else {
            return this._router.parseUrl("/login");
        }
    }
}
