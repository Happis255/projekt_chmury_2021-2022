import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { IUser } from "src/app/core/auth/model/user.interface";
import { MainMenuFacade } from "../../main-menu.facade";
import { ISideMenuElement } from "../../model/side-menu-element";

@Component({
    selector: "app-main-menu",
    templateUrl: "./main-menu.component.html",
    styleUrls: ["./main-menu.component.sass"]
})
export class MainMenuComponent implements OnInit, AfterViewInit {

    @ViewChild("videoPlayer")
    videoplayer: ElementRef;

    public isSmall = false;
    public loggedUser: IUser;
    public sideMenuElements: ISideMenuElement[] = [];

    constructor(
        private _mainMenuFacade: MainMenuFacade
    ) { }

    ngOnInit(): void {
        this.loggedUser = this._mainMenuFacade.getLocalUserData();
        if (this.loggedUser.role === "ADMIN") {
            this.sideMenuElements = this._mainMenuFacade.generateMenuItemsAdmin();
        } else {
            this.sideMenuElements = this._mainMenuFacade.generateMenuItemsWorker();
        }
    }

    ngAfterViewInit(): void {
        this.videoplayer.nativeElement.muted = true;
        this.videoplayer.nativeElement.play();
    }

    public onMenuWidthChange(): void {
        this.isSmall = !this.isSmall;
    }

    public signOut(): void {
        this._mainMenuFacade.signOut();
    }
}
