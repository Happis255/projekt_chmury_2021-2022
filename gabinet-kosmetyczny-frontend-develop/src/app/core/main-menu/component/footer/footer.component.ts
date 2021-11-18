import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.sass"]
})
export class FooterComponent implements OnInit {

    constructor(
        private _matIconRegistry: MatIconRegistry,
        private _domSanitizer: DomSanitizer
    ) {
        this._matIconRegistry.addSvgIcon(
            "facebook",
            this._domSanitizer.bypassSecurityTrustResourceUrl("assets/graphic/icons/logo-facebook.svg")
        );
        this._matIconRegistry.addSvgIcon(
            "github",
            this._domSanitizer.bypassSecurityTrustResourceUrl("assets/graphic/icons/logo-github.svg")
        );
        this._matIconRegistry.addSvgIcon(
            "linkedin",
            this._domSanitizer.bypassSecurityTrustResourceUrl("assets/graphic/icons/logo-linkedin.svg")
        );
    }

    ngOnInit(): void {
    }

}
