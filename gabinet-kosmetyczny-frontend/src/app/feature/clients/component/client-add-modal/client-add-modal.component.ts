import { IClientData } from "./../../model/client.model";
import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-client-add-modal",
  templateUrl: "./client-add-modal.component.html",
  styleUrls: ["./client-add-modal.component.sass"]
})
export class ClientAddModalComponent implements OnInit {

    @Input()
    public emails: string[] = [""];

    public newClient: IClientData;
    public clientAccountData: FormGroup = null;
    public clientInformationData: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<ClientAddModalComponent>
    ) { }

    ngOnInit(): void {
        this.clientAccountData = new FormGroup({
            email: new FormControl("", [Validators.required, Validators.email, this.emailTaken(this.emails)]),
            password: new FormControl("", [Validators.required]),
            secondPassword: new FormControl("", [Validators.required, this.passwordCheck("password")])
        });
        this.clientInformationData = new FormGroup({
            name: new FormControl("", Validators.required),
            surname: new FormControl("", Validators.required),
            street: new FormControl("", Validators.required),
            code: new FormControl("", Validators.required),
            town: new FormControl("", Validators.required),
            birthday: new FormControl("", Validators.required),
            phone: new FormControl("", Validators.required)
        });
    }

    public submit(): void {
        const newClient: IClientData = {
            name: this.clientInformationData.value.name,
            surname: this.clientInformationData.value.surname,
            street: this.clientInformationData.value.street,
            code: this.clientInformationData.value.code,
            town: this.clientInformationData.value.town,
            birthday: this.clientInformationData.value.birthday,
            phone: this.clientInformationData.value.phone,
            email: this.clientAccountData.value.email,
            password: this.clientAccountData.value.password,
        };
        this._dialogRef.close(newClient);
    }

    public passwordCheck(fieldName: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const password: string = control.value;
            const isTheSame = password !== control.root.value[fieldName];

            return isTheSame ? { "diffrentPasswords": { isTheSame } } : null;
        };
    }

    public emailTaken(emails: string[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const isIn = emails.includes(control.value);

            return isIn ? { "alreadyTaken": { isIn } } : null;
        };
    }
}
