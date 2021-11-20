import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { IError } from "../model/error.interface";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: "root"
})
export class ErrorService {

    constructor(
        private _translateService: TranslateService
    ) { }

    getClientMessage(error: IError): string {
        if (!navigator.onLine) {
            return this._translateService.instant("core.error.no_internet");
        }
        const system = error.system ? error.system + ": " : "";

        return system + error.errorDescription;
    }

    getServerMessage(error: HttpErrorResponse): string {
        return error.message;
    }
}
