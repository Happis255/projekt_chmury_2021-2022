import { AuthModule } from "./../../core/auth/auth.module";
import { EventsState } from "./state/events.state";
import { EventsFacade } from "./events.facade";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EventsComponent } from "./container/events/events.component";
import { EventsRouting } from "./events-routing.module";
import { TranslateModule } from "@ngx-translate/core";
import { EventsApi } from "./api/events.api";
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
import { AddNewEventModalComponent } from "./component/add-new-event-modal/add-new-event-modal.component";
import { ViewWorkerListModalComponent } from "./component/view-worker-list-modal/view-worker-list-modal.component";
import { EventsWorkerComponent } from './container/events-worker/events-worker.component';

@NgModule({
    declarations: [
        EventsComponent,
        AddNewEventModalComponent,
        ViewWorkerListModalComponent,
        EventsWorkerComponent
    ],
    imports: [
        CommonModule,
        EventsRouting,
        TranslateModule,
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
        MatDividerModule,
        AuthModule
    ],
    providers: [
        EventsFacade,
        EventsApi,
        EventsState
    ]
})
export class EventsModule { }
