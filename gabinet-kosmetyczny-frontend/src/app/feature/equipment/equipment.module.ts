import { EquipmentFacade } from "./equipment.facade";
import { EquipmentState } from "./state/equipment.state";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EquipmentComponent } from "./container/equipment/equipment.component";
import { EquipmentRouting } from "./equipment-routing.module";
import { TranslateModule } from "@ngx-translate/core";
import { EquipmentApi } from "./api/equipment.api";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MessageBoxModule } from "src/app/shared/message-box/message-box.module";
import { RaportsRouting } from "../raports/raports-routing.module";
import { ServicesModule } from "../services/services.module";
import { AddNewEquipmentModalComponent } from './component/add-new-equipment-modal/add-new-equipment-modal.component';
import { EditEquipmentModalComponent } from './component/edit-equipment-modal/edit-equipment-modal.component';

@NgModule({
    declarations: [
        EquipmentComponent,
        AddNewEquipmentModalComponent,
        EditEquipmentModalComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        EquipmentRouting,
        MatIconModule,
        MatTabsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatButtonModule,
        MatBadgeModule,
        MessageBoxModule,
        MatDialogModule,
        RaportsRouting,
        ServicesModule,
        MatFormFieldModule,
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        MatExpansionModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatCardModule,
        MatDividerModule
    ],
    providers: [
        EquipmentApi,
        EquipmentState,
        EquipmentFacade
    ]
})
export class EquipmentModule { }
