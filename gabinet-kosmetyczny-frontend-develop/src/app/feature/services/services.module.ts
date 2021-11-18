import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatBadgeModule } from "@angular/material/badge";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { SerivcesFilterComponent } from "./component/service-type-filter/service-type-filter.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ServicesComponent } from "./container/services/services.component";
import { ServicesSalesComponent } from "./container/services-sales/services-sales.component";
import { ServicesRouting } from "./services-routing.module";
import { TranslateModule } from "@ngx-translate/core";
import { ServicesApi } from "./api/services-api";
import { ServicesState } from "./state/services.state";
import { ServicesFacade } from "./services.facade";
import { ServiceAddModalComponent } from "./component/service-add-modal/service-add-modal.component";
import { ServiceEditModalComponent } from "./component/service-edit-modal/service-edit-modal.component";
import { MatNativeDateModule } from "@angular/material/core";
import { ServicePromotionAddModalComponent } from "./component/service-promotion-add-modal/service-promotion-add-modal.component";
import { ServicePromotionEditModalComponent } from "./component/service-promotion-edit-modal/service-promotion-edit-modal.component";
import { ServicePromotionViewModalComponent } from "./component/service-promotion-view-modal/service-promotion-view-modal.component";
import { ServicesSalesWorkerComponent } from './container/services-sales-worker/services-sales-worker.component';
import { ServicesWorkerComponent } from './container/services-worker/services-worker.component';

@NgModule({
    declarations: [
        ServicesComponent,
        ServicesSalesComponent,
        SerivcesFilterComponent,
        ServiceAddModalComponent,
        ServiceEditModalComponent,
        ServicePromotionAddModalComponent,
        ServicePromotionEditModalComponent,
        ServicePromotionViewModalComponent,
        ServicesComponent,
        ServicesSalesWorkerComponent,
        ServicesWorkerComponent
    ],
    imports: [
        CommonModule,
        ServicesRouting,
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
        MatNativeDateModule
    ],
    providers: [
        ServicesFacade,
        ServicesState,
        ServicesApi
    ]
})
export class ServicesModule { }
