import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { LoggingService } from "./logging.service";
import { NotificationService } from "./notification.service";
import { ErrorService } from "./error.service";
import { isIErrorObject } from "../model/error.interface";
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

    constructor(
        private _errorService: ErrorService,
        private _logger: LoggingService,
        private _notifier: NotificationService,
        private _router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            retry(1),
            catchError((error: any) => {
                let message;
                if (error instanceof HttpErrorResponse) {
                    const detailedError = error.error;
                    if ([406, 401].indexOf(error.status) > -1) {
                        return throwError(error);
                    } else if (error.status === 401) {
                        this._notifier.showError(message);
                        this._router.navigate(["/login"]);

                        return throwError(error);
                    } else if (detailedError && isIErrorObject(detailedError)) {
                        message = this._errorService.getClientMessage(detailedError);
                        this._notifier.showError(message);
                    } else if (detailedError && (typeof detailedError) === "string") {
                        message = detailedError;
                        this._notifier.showError(message);
                    } else {
                        message = this._errorService.getServerMessage(error);
                        this._notifier.showError(message);
                    }
                } else {
                    message = error.toString();
                    this._notifier.showError(message);
                }
                this._logger.logError(message);

                return throwError(error);
            })
        );
    }
}
