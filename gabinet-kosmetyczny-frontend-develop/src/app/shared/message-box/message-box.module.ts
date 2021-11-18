import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageBoxComponent } from "./component/message-box/message-box.component";
import { TranslateModule } from "@ngx-translate/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    declarations: [
        MessageBoxComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        MatDialogModule,
        MatButtonModule
    ],
    exports: [
        MessageBoxComponent
    ]
})
export class MessageBoxModule { }
