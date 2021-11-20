import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSortModule } from "@angular/material/sort";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { HomePageComponent } from "./container/home-page.component";
import { LoginModule } from "src/app/feature/login/login.module";
import { HomeFacade } from "./home.facade";
import { HomeState } from "./state/home.state";
import { HomeApi } from "./api/home.api";
import { DatabaseNumbersInformationComponent } from "./component/database-numbers-information/database-numbers-information.component";
import { IncomeDashboardInformationComponent } from "./component/income-dashboard-information/income-dashboard-information.component";
import { ProductsInformationComponent } from "./component/products-information/products-information.component";
import { RaportsInformationComponent } from "./component/raports-information/raports-information.component";
import { NotificationInformationComponent } from "./component/notification-information/notification-information.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatBadgeModule } from "@angular/material/badge";
import { MessageBoxModule } from "src/app/shared/message-box/message-box.module";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        LoginModule,
        MatIconModule,
        MatTabsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatButtonModule,
        MatBadgeModule,
        MessageBoxModule,
        MatDialogModule
    ],
    declarations: [
        HomePageComponent,
        DatabaseNumbersInformationComponent,
        IncomeDashboardInformationComponent,
        NotificationInformationComponent,
        RaportsInformationComponent,
        ProductsInformationComponent
    ],
    exports: [
        HomePageComponent
    ],
    providers: [
        HomeFacade,
        HomeState,
        HomeApi
    ]
})
export class HomeModule { }
