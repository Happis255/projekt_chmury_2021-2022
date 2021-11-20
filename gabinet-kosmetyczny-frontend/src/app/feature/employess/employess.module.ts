import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatBadgeModule } from "@angular/material/badge";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { TranslateModule } from "@ngx-translate/core";
import { EmployessTaskComponent } from "./container/employess-task/employess-task.component";
import { EmployessAbsencesComponent } from "./container/employess-absences/employess-absences.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { EmployessApi } from "./api/emplyess.api";
import { EmployessState } from "./state/employess.state";
import { EmployessFacade } from "./employess.facade";
import { EmployessComponent } from "./container/employess/employess.component";
import { EmployessRouting } from "./employess-routing.module";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AccountModule } from "../account/account.module";
import { EmployessGiveBonusModalComponent } from "./component/employee-bonus-give-modal/employee-bonus-give-modal";
import { EmployeeIncomeInformationModalComponent } from "./component/employee-income-information-modal/employee-income-information-modal.component";
import { EmployeeAddNewModalComponent } from "./component/employee-add-new-modal/employee-add-new-modal.component";
import { MatStepperModule } from "@angular/material/stepper";
import { EconomicTaskModalComponent } from "./component/economic-task-modal/economic-task-modal.component";
import { EconomicTaskFilterComponent } from "./component/economic-task-filter/economic-task-filter.component";
import { EmployeeSendMessageModalComponent } from "./component/employee-send-message-modal/employee-send-message-modal.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { AbsenceAddModalComponent } from "./component/absence-add-modal/absence-add-modal.component";
import { EmployessWorkerComponent } from "./container/employess-worker/employess-worker.component";
import { EmployessAbsencesWorkerComponent } from "./container/employess-absences-worker/employess-absences-worker.component";

@NgModule({
    declarations: [
        EmployessComponent,
        EmployessTaskComponent,
        EmployessAbsencesComponent,
        EmployessGiveBonusModalComponent,
        EmployeeIncomeInformationModalComponent,
        EmployeeAddNewModalComponent,
        EconomicTaskModalComponent,
        EconomicTaskFilterComponent,
        EmployeeSendMessageModalComponent,
        AbsenceAddModalComponent,
        EmployessWorkerComponent,
        EmployessAbsencesWorkerComponent
    ],
    imports: [
        CommonModule,
        EmployessRouting,
        TranslateModule,
        MatExpansionModule,
        MatButtonModule,
        MatDividerModule,
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
        MatBadgeModule,
        MatTooltipModule,
        AccountModule,
        MatStepperModule,
        MatCheckboxModule,
        MatCardModule
    ],
    providers: [
        EmployessFacade,
        EmployessState,
        EmployessApi
    ]
})
export class EmployessModule { }
