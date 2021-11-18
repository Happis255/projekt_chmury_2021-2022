import { MatBadgeModule } from "@angular/material/badge";
import { AccountModule } from "./../account/account.module";
import { AuthModule } from "./../../core/auth/auth.module";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { RaportsState } from "./state/raports.state";
import { RaportsApi } from "./api/raports.api";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RaportsComponent } from "./container/raports/raports.component";
import { TranslateModule } from "@ngx-translate/core";
import { RaportsRouting } from "./raports-routing.module";
import { RaportsAddModalComponent } from "./component/raports-add-modal/raports-add-modal.component";
import { RaportsSeeModalComponent } from "./component/raports-see-modal/raports-see-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ServicesModule } from "../services/services.module";
import { RaportsFacade } from "./raports.facade";
import { MachineRaportsSeeModalComponent } from "./component/machine-raports-see-modal/machine-raports-see-modal.component";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { RaportAddTrashesModalComponent } from "./component/raport-add-trashes-modal/raport-add-trashes-modal.component";
import { RaportAddMachineModalComponent } from "./component/raport-add-machine-modal/raport-add-machine-modal.component";

@NgModule({
    declarations: [
        RaportsComponent,
        RaportsAddModalComponent,
        RaportsSeeModalComponent,
        MachineRaportsSeeModalComponent,
        RaportAddTrashesModalComponent,
        RaportAddMachineModalComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        RaportsRouting,
        MatIconModule,
        MatTooltipModule,
        ServicesModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        MatSelectModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatTabsModule,
        MatInputModule,
        MatExpansionModule,
        MatNativeDateModule,
        MatDatepickerModule,
        AuthModule,
        AccountModule,
        MatBadgeModule
    ],
    providers: [
        RaportsApi,
        RaportsState,
        RaportsFacade
    ]
})
export class RaportsModule { }
