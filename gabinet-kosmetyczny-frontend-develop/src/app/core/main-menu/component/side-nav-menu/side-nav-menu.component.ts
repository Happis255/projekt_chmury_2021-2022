import { Component, Input, OnInit } from "@angular/core";
import { ISideMenuElement } from "../../model/side-menu-element";

@Component({
    selector: "app-side-nav-menu",
    templateUrl: "./side-nav-menu.component.html",
    styleUrls: ["./side-nav-menu.component.sass"]
})
export class SideNavMenuComponent implements OnInit {

    @Input()
    public sideMenuElements: ISideMenuElement[] = [];

    @Input()
    public isSmall = false;

    constructor() { }

    ngOnInit(): void {
    }
}
