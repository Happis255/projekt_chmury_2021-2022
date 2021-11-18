import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { ISideMenuElement } from "../../model/side-menu-element";

@Component({
    selector: "app-side-nav-menu-item",
    templateUrl: "./side-nav-menu-item.component.html",
    styleUrls: ["./side-nav-menu-item.component.sass"]
})
export class SideNavMenuItemComponent implements OnInit, OnChanges {

    @Input()
    public sideMenuElement: ISideMenuElement;

    @Input()
    public isSmall = false;
    public isClosed = false;

    constructor(
        public router: Router
    ) { }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.isSmall && this.isClosed) {
            this.isClosed = false;
        }
    }

    public checkIfSelectedMatHeader(childrens: ISideMenuElement[]): string {
        if (this.isSmall) {
            if (childrens.find(element => element.url === this.router.url)) {
                return "mat-expansion-panel-header-not-selected";
            }
        }

        return "mat-expansion-panel-header-selected";
    }
}
