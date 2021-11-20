import { IClientData } from "./../../model/client.model";
import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-client-edit-modal",
    templateUrl: "./client-edit-modal.component.html",
    styleUrls: ["./client-edit-modal.component.sass"]
})
export class ClientEditModalComponent implements OnInit {

    @Input()
    public clientToEdit: IClientData;

    @Input()
    public emails: string[];

    public clientAccountData: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<ClientEditModalComponent>
    ) { }

    ngOnInit(): void {
        this.emails = this.emails.slice(this.emails.findIndex((email: string) => email === this.clientToEdit.email), 1);
        this.clientAccountData = new FormGroup({
            email: new FormControl(this.clientToEdit.email, [Validators.required, Validators.email, this.emailTaken(this.emails)]),
            password: new FormControl("", [Validators.required]),
            secondPassword: new FormControl("", [Validators.required, this.passwordCheck("password")]),
            name: new FormControl(this.clientToEdit.name, Validators.required),
            surname: new FormControl(this.clientToEdit.surname, Validators.required),
            street: new FormControl(this.clientToEdit.street, Validators.required),
            code: new FormControl(this.clientToEdit.code, Validators.required),
            town: new FormControl(this.clientToEdit.town, Validators.required),
            birthday: new FormControl(this.clientToEdit.birthday, Validators.required),
            phone: new FormControl(this.clientToEdit.phone, Validators.required)
        });
    }

    public submit(): void {
        this.clientToEdit.name = this.clientAccountData.value.name;
        this.clientToEdit.surname = this.clientAccountData.value.surname;
        this.clientToEdit.street = this.clientAccountData.value.street;
        this.clientToEdit.code = this.clientAccountData.value.code;
        this.clientToEdit.town = this.clientAccountData.value.town;
        this.clientToEdit.birthday = this.clientAccountData.value.birthday;
        this.clientToEdit.phone = this.clientAccountData.value.phone;
        this.clientToEdit.email = this.clientAccountData.value.email;
        this.clientToEdit.password = this.clientAccountData.value.password;
        this._dialogRef.close(this.clientToEdit);
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
