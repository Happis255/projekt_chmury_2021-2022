import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { IWorkerAccountInfromation } from "src/app/feature/account/model/worker-account-information.interface";

@Component({
    selector: "app-employee-bonus-give-modal",
    templateUrl: "./employee-bonus-give-modal.html",
    styleUrls: ["./employee-bonus-give-modal.sass"]
})
export class EmployessGiveBonusModalComponent implements OnInit {

    @Input()
    public accountInformations: IWorkerAccountInfromation;

    public workerBonusGiveForm: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<EmployessGiveBonusModalComponent>
    ) { }

    ngOnInit(): void {
        this.workerBonusGiveForm = new FormGroup({
            name: new FormControl({value: this.accountInformations.name, disabled: true}),
            surname: new FormControl({value: this.accountInformations.surname, disabled: true}),
            bonus: new FormControl("", [Validators.required])
        });
    }

    public sumbit(): void {
        this._dialogRef.close(this.workerBonusGiveForm.value.bonus.toFixed(2));
    }
}
