import { AccountModule } from "./../account/account.module";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { ClientFacade } from "./client.facade";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { ClientFilterComponent } from "./component/client-filter/client-filter.component";
import { ClientState } from "./state/client.state";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientsComponent } from "./container/clients/clients.component";
import { TranslateModule } from "@ngx-translate/core";
import { ClientstRoutingModule } from "./account-routing.module";
import { ClientApi } from "./api/client.api";
import { MatExpansionModule } from "@angular/material/expansion";
import { ClientAddModalComponent } from "./component/client-add-modal/client-add-modal.component";
import { ClientEditModalComponent } from "./component/client-edit-modal/client-edit-modal.component";
import { ClientSendMessageComponent } from "./component/client-send-message/client-send-message.component";
import { ClientViewModalComponent } from "./component/client-view-modal/client-view-modal.component";

@NgModule({
    declarations: [
        ClientsComponent,
        ClientFilterComponent,
        ClientAddModalComponent,
        ClientEditModalComponent,
        ClientSendMessageComponent,
        ClientViewModalComponent
    ],
    imports: [
        CommonModule,
        ClientstRoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        MatExpansionModule,
        MatDialogModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatStepperModule,
        MatSelectModule,
        AccountModule
    ],
    providers: [
        ClientApi,
        ClientState,
        ClientFacade
    ]
})
export class ClientsModule { }
