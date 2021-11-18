import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-password-reminder",
    templateUrl: "./password-reminder.component.html",
    styleUrls: ["./password-reminder.component.sass"]
})
export class PasswordReminderComponent implements OnInit {

    @Output()
    public passwordReminderEvent = new EventEmitter<FormGroup>();

    public sended = false;
    public passwordReminderForm: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.passwordReminderForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]]
        });
    }

    public resetSended(): void {
        this.sended = false;
    }

    public onSubmit(): void {
        if (this.passwordReminderForm.invalid || this.sended) {
            return;
        }
        this.sended = true;
        this.passwordReminderEvent.emit(this.passwordReminderForm.value.email);
    }
}
