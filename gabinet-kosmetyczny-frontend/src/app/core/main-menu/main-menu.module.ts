import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { HeaderComponent } from "./component/header/header.component";
import { FooterComponent } from "./component/footer/footer.component";
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatExpansionModule } from "@angular/material/expansion";
import { MainMenuComponent } from "./container/main-menu/main-menu.component";
import { SideNavMenuComponent } from "./component/side-nav-menu/side-nav-menu.component";
import { SideNavMenuItemComponent } from "./component/side-nav-menu-item/side-nav-menu-item.component";
import { SideNavMenuSubItemComponent } from "./component/side-nav-menu-sub-item/side-nav-menu-sub-item.component";
import { AuthorizationModule } from "../authorization/authorization.module";
import { MainMenuFacade } from "./main-menu.facade";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        MatIconModule,
        HttpClientModule,
        MatButtonModule,
        MatMenuModule,
        MatExpansionModule,
        AuthorizationModule
    ],
    declarations: [
        MainMenuComponent,
        HeaderComponent,
        FooterComponent,
        SideNavMenuComponent,
        SideNavMenuItemComponent,
        SideNavMenuSubItemComponent
    ],
    exports: [
        MainMenuComponent,
        HeaderComponent,
        FooterComponent,
        SideNavMenuComponent,
        SideNavMenuItemComponent,
        SideNavMenuSubItemComponent
    ],
    providers: [
        MainMenuFacade
    ]
})
export class MainMenuModule { }
