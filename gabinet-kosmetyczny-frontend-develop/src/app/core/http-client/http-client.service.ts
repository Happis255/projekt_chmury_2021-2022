import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class UserUuidInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accountUuid = localStorage.getItem(environment.APP_PREFIX + "accountUuid");
        const modifiedReq = req.clone({
          headers: req.headers.set("account-uuid", accountUuid),
        });

        return next.handle(modifiedReq);
    }
}
