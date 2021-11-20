import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUserLoggedIn } from "../model/user-logged.interface";
import { IUserLogin } from "../model/user-login.interface";
import { Observable } from "rxjs";

@Injectable()
export class LoginApi {

    constructor(
        private http: HttpClient
    ) { }

    public loginRequest(formValue: IUserLogin): Observable<IUserLoggedIn> {
        return this.http.post<any>(environment.api + "login", formValue);
    }

    public remindPassword(email: string): void {
        this.http.post<any>(environment.api + "login/reset-password", {email}).toPromise();
    }
}
