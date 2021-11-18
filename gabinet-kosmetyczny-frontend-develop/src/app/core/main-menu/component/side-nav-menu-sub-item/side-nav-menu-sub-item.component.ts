import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ISideMenuElement } from "../../model/side-menu-element";

@Component({
    selector: "app-side-nav-menu-sub-item",
    templateUrl: "./side-nav-menu-sub-item.component.html",
    styleUrls: ["./side-nav-menu-sub-item.component.sass"]
})
export class SideNavMenuSubItemComponent implements OnInit {

    @Input()
    public sideMenuElement: ISideMenuElement;

    constructor(
        public router: Router
    ) { }

    ngOnInit(): void {
    }

}
