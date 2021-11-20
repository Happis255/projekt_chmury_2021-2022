import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotFoundComponent } from "./container/not-found/not-found.component";
import { AccountRoutingModule } from "./not-found-routing.module";
import { TranslateModule } from "@ngx-translate/core";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    declarations: [
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        AccountRoutingModule,
        MatButtonModule
    ],
    exports: [
        NotFoundComponent
    ]
})
export class NotFoundModule {
}
