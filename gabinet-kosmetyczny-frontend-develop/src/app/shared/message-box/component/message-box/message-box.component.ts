import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IMessageBoxData } from "../model/message-box-data.interface";

@Component({
    selector: "app-message-box",
    templateUrl: "./message-box.component.html",
    styleUrls: ["./message-box.component.sass"]
})
export class MessageBoxComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: IMessageBoxData) { }

    ngOnInit(): void {
    }
}
