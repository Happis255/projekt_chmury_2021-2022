import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LoggingService {

    constructor() { }

    public logError(message: string): void {
        console.log("LoggingService, error message: " + message);
    }
}
