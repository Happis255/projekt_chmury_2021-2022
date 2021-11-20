import { AccountApi } from './api/account.api';
import { AccountState } from './state/account.state';
import { AccountFacade } from './account.facade';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDividerModule } from "@angular/material/divider";
import { AccountComponent } from "./container/account/account.component";
import { TranslateModule } from "@ngx-translate/core";
import { AccountRoutingModule } from "./account-routing.module";
import { AccountEditModalComponent } from "./component/account-edit-modal/account-edit-modal.component";
import { AccountInformationCardComponent } from "./component/account-information-card/account-information-card.component";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { WorkerHealthCardInformationCardComponent } from "./component/worker-health-card-information-card/worker-health-card-information-card.component";
import { WorkerPriceInformationCardComponent } from "./component/worker-price-information-card/worker-price-information-card.component";
import { WorkerCertificatesInformationCardComponent } from "./component/worker-certificates-information-card/worker-certificates-information-card.component";
import { WorkerHealthCardEditModalComponent } from "./component/worker-health-card-edit-modal/worker-health-card-edit-modal.component";
import { WorkerCertificationsEditModalComponent } from "./component/worker-certifications-edit-modal/worker-certifications-edit-modal.component";

@NgModule({
    declarations: [
        AccountComponent,
        AccountEditModalComponent,
        AccountInformationCardComponent,
        WorkerHealthCardInformationCardComponent,
        WorkerPriceInformationCardComponent,
        WorkerCertificatesInformationCardComponent,
        WorkerHealthCardEditModalComponent,
        WorkerCertificationsEditModalComponent
    ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        TranslateModule,
        MatIconModule,
        MatDividerModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTabsModule,
        MatBadgeModule
    ],
    providers: [
        AccountFacade,
        AccountState,
        AccountApi
    ],
    exports: [
        WorkerHealthCardEditModalComponent,
        WorkerCertificationsEditModalComponent,
        AccountEditModalComponent
    ]
})
export class AccountModule { }
