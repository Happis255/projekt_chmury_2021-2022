import { Component, AfterViewInit, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { LoginFacade } from "../../login.facade";

@Component({
    selector: "app-login-dialog",
    templateUrl: "./login-dialog.component.html",
    styleUrls: ["./login-dialog.component.sass"]
})
export class LoginDialogComponent implements OnInit, AfterViewInit {

    @ViewChild("videoPlayer")
    videoplayer: ElementRef;    public incorrectLogin = false;

    public reminderSended = false;

    constructor(
        private _loginFacade: LoginFacade
    ) { }

    ngOnInit(): void {
        this._loginFacade.checkIfUserLoggedIn();
    }

    ngAfterViewInit(): void {
        this.videoplayer.nativeElement.muted = true;
        this.videoplayer.nativeElement.play();
    }


    public loginUser(formGroup: FormGroup): void {
        this._loginFacade.loginInUser(formGroup.value).then((incorrect: boolean) => {
            this.incorrectLogin = incorrect;
        });
    }

    public remindPassword(email: string): void {
        this._loginFacade.remindPassword(email);
    }
}
