import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { ServicesModule } from "./../services/services.module";
import { PermissionsFacade } from "./permissions.facade";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PermissionsComponent } from "./container/permissions/permissions.component";
import { PermissionsRouting } from "./permissions-routing.module";
import { TranslateModule } from "@ngx-translate/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { PermissionsApi } from "./api/permissions.api";
import { WorkerServiceEditModalComponent } from "./component/worker-service-edit-modal/worker-service-edit-modal.component";
import { WorkerServiceViewModalComponent } from "./component/worker-service-view-modal/worker-service-view-modal.component";
import { PermissionsState } from "./state/permissions.state";
import { ReactiveFormsModule } from "@angular/forms";
import { PermissionsWorkerComponent } from './container/permissions-worker/permissions-worker.component';

@NgModule({
    declarations: [
        PermissionsComponent,
        WorkerServiceEditModalComponent,
        WorkerServiceViewModalComponent,
        PermissionsWorkerComponent
    ],
    imports: [
        CommonModule,
        PermissionsRouting,
        TranslateModule,
        MatExpansionModule,
        MatIconModule,
        MatTooltipModule,
        ServicesModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        MatSelectModule,
        MatDialogModule,
        ReactiveFormsModule
    ],
    providers: [
        PermissionsFacade,
        PermissionsState,
        PermissionsApi
    ]
})
export class PermissionsModule { }
