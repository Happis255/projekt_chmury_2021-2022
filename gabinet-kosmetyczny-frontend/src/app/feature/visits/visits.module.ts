import { ServicesModule } from "./../services/services.module";
import { VisitsState } from "./state/visits.state";
import { VisitsApi } from "./api/visits-api";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VisitsComponent } from "./container/visits/visits.component";
import { VisitsRouting } from "./visits-routing.module";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { VisitsFacade } from "./visits-facade";
import { MatFormFieldModule } from "@angular/material/form-field";
import { AddNewVisitComponent } from "./container/add-new-visit/add-new-visit.component";
import { AddNewClientComponent } from "./container/add-new-client/add-new-client.component";

@NgModule({
    declarations: [
        VisitsComponent,
        AddNewVisitComponent,
        AddNewClientComponent
    ],
    imports: [
        CommonModule,
        VisitsRouting,
        TranslateModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        MatTooltipModule,
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatDividerModule,
        MatDialogModule,
        MatInputModule,
        MatCardModule,
        MatBadgeModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ServicesModule,
        MatTooltipModule
    ],
    providers: [
        VisitsFacade,
        VisitsApi,
        VisitsState
    ]
})
export class VisitsModule { }
