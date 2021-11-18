import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { IUser } from "src/app/core/auth/model/user.interface";

@Component({
    selector: "app-menu-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.sass"]
})
export class HeaderComponent {

    @Input()
    public loggedUser: IUser;

    @Output()
    public signOut = new EventEmitter<boolean>();

    @Output()
    public isSmall = new EventEmitter<boolean>();

    constructor(
        private _translate: TranslateService
    ) { }

    public setLanguagePl(): void {
        this._translate.use("pl");
        localStorage.setItem("lang", "pl");
    }

    public setLanguageEng(): void {
        this._translate.use("en");
        localStorage.setItem("lang", "en");
    }

    public setLanguageJp(): void {
        this._translate.use("jp");
        localStorage.setItem("lang", "jp");
    }

    public signOutUser(): void {
        this.signOut.emit(true);
    }

    public changeMenuWidth(): void {
        this.isSmall.emit(true);
    }
}
