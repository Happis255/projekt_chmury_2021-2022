import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from "@angular/material/stepper";
import { LoginDialogComponent } from "./container/login-dialog/login-dialog.component";
import { LoginFormComponent } from "./component/login-form/login-form.component";
import { NgModule } from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { LoginApi } from "./api/login.api";
import { LoginFacade } from "./login.facade";
import { LoginRoutingModule } from "./login-routing.module";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { PasswordReminderComponent } from "./component/password-reminder/password-reminder.component";

@NgModule({
    declarations: [
        LoginFormComponent,
        LoginDialogComponent,
        PasswordReminderComponent
    ],
    imports: [
        LoginRoutingModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        TranslateModule,
        CommonModule,
        ReactiveFormsModule,
        MatStepperModule,
        MatMenuModule
    ],
    providers: [
        LoginApi,
        LoginFacade
    ]
})
export class LoginModule {
    constructor(
        public translate: TranslateService,
    ) {
        translate.use(!!translate.currentLang ? translate.currentLang : translate.getBrowserLang());
    }
}
