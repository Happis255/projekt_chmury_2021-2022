import { ValidatorFn, Validators } from "@angular/forms";
import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";
import { INewWorker } from "../../model/new-worker.interface";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-employee-add-new-modal",
    templateUrl: "./employee-add-new-modal.component.html",
    styleUrls: ["./employee-add-new-modal.component.sass"]
})
export class EmployeeAddNewModalComponent implements OnInit {

    @Input()
    public emails: string[] = [""];

    public newWorker: INewWorker;
    public workerAccountDataForm: FormGroup = null;
    public workerInformationsForm: FormGroup;
    public workerHealthCardForm: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<EmployeeAddNewModalComponent>
    ) { }

    ngOnInit(): void {
        this.workerAccountDataForm = new FormGroup({
            email: new FormControl("", [Validators.required, Validators.email, this.emailTaken(this.emails)]),
            password: new FormControl("", [Validators.required]),
            secondPassword: new FormControl("", [Validators.required, this.passwordCheck("password")])
        });
        this.workerInformationsForm = new FormGroup({
            name: new FormControl("", Validators.required),
            surname: new FormControl("", Validators.required),
            street: new FormControl("", Validators.required),
            code: new FormControl("", Validators.required),
            town: new FormControl("", Validators.required),
            birthday: new FormControl("", Validators.required),
            phone: new FormControl("", Validators.required),
            pesel: new FormControl("", Validators.required),
            certificates: new FormControl(""),
        });
        this.workerHealthCardForm = new FormGroup({
            pacemaker: new FormControl("", Validators.required),
            hermophilia: new FormControl("", Validators.required),
            psoriasis: new FormControl("", Validators.required),
            allergies: new FormControl("", Validators.required),
            discoloration: new FormControl("", Validators.required),
            infectiousDiseases: new FormControl("", Validators.required),
            bloodCirculationDisorders: new FormControl("", Validators.required),
            herpes: new FormControl("", Validators.required),
            fever: new FormControl("", Validators.required),
            pregnancy: new FormControl("", Validators.required),
            weakness: new FormControl("", Validators.required)
        });
    }

    public submit(): void {
        const newWorker: INewWorker = {
            email: this.workerAccountDataForm.value.email,
            password: this.workerAccountDataForm.value.password,
            role: "WORKER",
            name: this.workerInformationsForm.value.name,
            surname: this.workerInformationsForm.value.surname,
            street: this.workerInformationsForm.value.street,
            code: this.workerInformationsForm.value.code,
            town: this.workerInformationsForm.value.town,
            birthday: this.workerInformationsForm.value.birthday,
            phone: this.workerInformationsForm.value.phone,
            pesel: this.workerInformationsForm.value.pesel,
            certificates: this.workerInformationsForm.value.certificates,
            pacemaker: this.workerHealthCardForm.value.pacemaker,
            hermophilia: this.workerHealthCardForm.value.hermophilia,
            psoriasis: this.workerHealthCardForm.value.psoriasis,
            allergies: this.workerHealthCardForm.value.allergies,
            infectiousDiseases: this.workerHealthCardForm.value.infectiousDiseases,
            discoloration: this.workerHealthCardForm.value.discoloration,
            bloodCirculationDisorders: this.workerHealthCardForm.value.bloodCirculationDisorders,
            herpes: this.workerHealthCardForm.value.herpes,
            fever: this.workerHealthCardForm.value.fever,
            pregnancy: this.workerHealthCardForm.value.pregnancy,
            weakness: this.workerHealthCardForm.value.weakness,
        };
        this._dialogRef.close(newWorker);
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
