import { Injectable } from "@angular/core";
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, Router } from "@angular/router";
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthFacade } from "../../auth/auth.facade";

@Injectable({
    providedIn: "root"
})
export class LoginGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(
        private _auth: AuthFacade
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this._auth.loggedIn();
    }
}
