import { EventEmitter, Output } from "@angular/core";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.sass"]
})
export class LoginFormComponent implements OnInit {

    @Input()
    public incorrect = false;

    @Output()
    public loginFormEmmiter = new EventEmitter<FormGroup>();

    public loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(4)]]
        });
    }

    public onSubmit(): void {
        if (this.loginForm.invalid) {
            return;
        }
        this.loginFormEmmiter.emit(this.loginForm);
    }
}
