import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { IWorkerAccountInfromation } from "../../model/worker-account-information.interface";

@Component({
    selector: "app-account-edit-modal",
    templateUrl: "./account-edit-modal.component.html",
    styleUrls: ["./account-edit-modal.component.sass"]
})
export class AccountEditModalComponent implements OnInit {

    @Input()
    public accountInformations: IWorkerAccountInfromation;

    @Input()
    public editMode = true;

    public workerAccountInformationForm: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<AccountEditModalComponent>
    ) { }

    ngOnInit(): void {
        if (this.editMode) {
            this.workerAccountInformationForm = new FormGroup({
                name: new FormControl(this.accountInformations.name, [Validators.required]),
                surname: new FormControl(this.accountInformations.surname, [Validators.required]),
                birthday: new FormControl(this.accountInformations.birthday, [Validators.required]),
                phone: new FormControl(this.accountInformations.phone, [Validators.required]),
                eMail: new FormControl(this.accountInformations.email, [Validators.required]),
                street: new FormControl(this.accountInformations.street, [Validators.required]),
                town: new FormControl(this.accountInformations.town, [Validators.required]),
                townCode: new FormControl(this.accountInformations.code, [Validators.required])
            });
        } else {
            this.workerAccountInformationForm = new FormGroup({
                name: new FormControl({value: this.accountInformations.name, disabled: true}, [Validators.required]),
                surname: new FormControl({value: this.accountInformations.surname, disabled: true}, [Validators.required]),
                birthday: new FormControl({value: this.accountInformations.birthday, disabled: true}, [Validators.required]),
                phone: new FormControl({value: this.accountInformations.phone, disabled: true}, [Validators.required]),
                eMail: new FormControl({value: this.accountInformations.email, disabled: true}, [Validators.required]),
                street: new FormControl({value: this.accountInformations.street, disabled: true}, [Validators.required]),
                town: new FormControl({value: this.accountInformations.town, disabled: true}, [Validators.required]),
                townCode: new FormControl({value: this.accountInformations.code, disabled: true}, [Validators.required])
            });
        }
    }

    public sumbit(): void {
        if (this.editMode) {
            const accountInformation: IWorkerAccountInfromation = {
                uuid: this.accountInformations.uuid,
                accountUuid: this.accountInformations.accountUuid,
                name: this.workerAccountInformationForm.value.name,
                email: this.workerAccountInformationForm.value.eMail,
                surname: this.workerAccountInformationForm.value.surname,
                street: this.workerAccountInformationForm.value.street,
                code: this.workerAccountInformationForm.value.townCode,
                town: this.workerAccountInformationForm.value.town,
                birthday: this.workerAccountInformationForm.value.birthday,
                phone: this.workerAccountInformationForm.value.phone,
                pesel: this.accountInformations.pesel,
                accountType: this.accountInformations.accountType,
                dateOfEmployment: this.accountInformations.dateOfEmployment,
                certificates: this.accountInformations.certificates
            };
            console.log(accountInformation);
            this._dialogRef.close(accountInformation);
        } else {
            this._dialogRef.close();
        }
    }
}
