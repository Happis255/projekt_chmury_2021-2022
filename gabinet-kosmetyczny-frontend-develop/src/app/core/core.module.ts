import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { environment } from "src/environments/environment";
import { HomeModule } from "./home/home.module";
import { AuthModule } from "./auth/auth.module";
import { AuthFacade } from "./auth/auth.facade";
import { AuthorizationModule } from "./authorization/authorization.module";
import { CanAccessDirective } from "./authorization/directive/can-access.directive";
import { MainMenuModule } from "./main-menu/main-menu.module";
import { FooterComponent } from "./main-menu/component/footer/footer.component";
import { MainMenuComponent } from "./main-menu/container/main-menu/main-menu.component";
import { HomePageComponent } from "./home/container/home-page.component";

@NgModule({
    imports: [
        CommonModule,
        HomeModule,
        AuthorizationModule,
        AuthModule,
        MainMenuModule
    ],
    declarations: [
    ],
    exports: [
        HomePageComponent,
        FooterComponent,
        CanAccessDirective,
        MainMenuComponent
    ]
})
export class CoreModule {
    constructor(
        private _authFacade: AuthFacade
    ) {
        if (!!localStorage.getItem(environment.APP_PREFIX + "email")) {
            this._authFacade.setUser(this._authFacade.getLocalStorageData());
        } else if (!this._authFacade.getUser()) {
            this._authFacade.onClearSession();
        }
    }
}
