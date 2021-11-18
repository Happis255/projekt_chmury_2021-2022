import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SystemManagementComponent } from "./container/system-management/system-management.component";
import { TranslateModule } from "@ngx-translate/core";
import { SystemManagementRouting } from "./system-management-routing.module";

@NgModule({
    declarations: [
        SystemManagementComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        SystemManagementRouting
    ]
})
export class SystemManagementModule { }
