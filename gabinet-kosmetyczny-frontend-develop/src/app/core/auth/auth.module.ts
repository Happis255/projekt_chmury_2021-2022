import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthFacade } from "./auth.facade";
import { UserState } from "./state/user.state";

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        AuthFacade,
        UserState
    ]
})
export class AuthModule { }
