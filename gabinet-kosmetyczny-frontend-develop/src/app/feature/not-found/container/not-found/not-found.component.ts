import { AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-not-found",
    templateUrl: "./not-found.component.html",
    styleUrls: ["./not-found.component.sass"]
})
export class NotFoundComponent implements OnInit, AfterViewInit {

    @ViewChild("videoPlayer")
    videoplayer: ElementRef;

    constructor(
        private _translate: TranslateService
    ) {
        const lang = localStorage.getItem("lang");
        if (lang != null) {
            this._translate.use(lang);
        }
    }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        this.videoplayer.nativeElement.muted = true;
        this.videoplayer.nativeElement.play();
    }
}
