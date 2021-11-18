import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CanAccessDirective } from "./directive/can-access.directive";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [CanAccessDirective],
    exports: [CanAccessDirective]
})
export class AuthorizationModule { }
