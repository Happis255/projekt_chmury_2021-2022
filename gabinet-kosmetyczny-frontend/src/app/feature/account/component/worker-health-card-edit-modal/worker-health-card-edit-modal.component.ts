import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { IWorkerHealthCard } from "../../model/worker-health-card.interface";

@Component({
    selector: "app-worker-health-card-edit-modal",
    templateUrl: "./worker-health-card-edit-modal.component.html",
    styleUrls: ["./worker-health-card-edit-modal.component.sass"]
})
export class WorkerHealthCardEditModalComponent implements OnInit {

    @Input()
    public workerHealthCard: IWorkerHealthCard;

    @Input()
    public editMode = true;

    public workerHealthCardForm: FormGroup;

    constructor(
        private _dialogRef: MatDialogRef<WorkerHealthCardEditModalComponent>
    ) { }

    ngOnInit(): void {
        if (this.editMode) {
            this.workerHealthCardForm = new FormGroup({
                pacemaker: new FormControl("" + this.workerHealthCard.pacemaker.valueOf(), [Validators.required]),
                hermophilia: new FormControl("" + this.workerHealthCard.hermophilia.valueOf(), [Validators.required]),
                psoriasis: new FormControl("" + this.workerHealthCard.psoriasis.valueOf(), [Validators.required]),
                allergies: new FormControl(this.workerHealthCard.allergies, [Validators.required]),
                discoloration: new FormControl("" + this.workerHealthCard.discoloration.valueOf(), [Validators.required]),
                infectiousDiseases: new FormControl("" + this.workerHealthCard.infectiousDiseases.valueOf(), [Validators.required]),
                bloodCirculationDisorders: new FormControl("" + this.workerHealthCard.bloodCirculationDisorders.valueOf(), [Validators.required]),
                herpes: new FormControl("" + this.workerHealthCard.herpes.valueOf(), [Validators.required]),
                fever: new FormControl("" + this.workerHealthCard.fever.valueOf(), [Validators.required]),
                pregnancy: new FormControl("" + this.workerHealthCard.pregnancy.valueOf(), [Validators.required]),
                weakness: new FormControl("" + this.workerHealthCard.weakness.valueOf(), [Validators.required])
            });
        } else {
            this.workerHealthCardForm = new FormGroup({
                pacemaker: new FormControl({value: "" + this.workerHealthCard.pacemaker.valueOf(), disabled: true}, [Validators.required]),
                hermophilia: new FormControl({value: "" + this.workerHealthCard.hermophilia.valueOf(), disabled: true}, [Validators.required]),
                psoriasis: new FormControl({value: "" + this.workerHealthCard.psoriasis.valueOf(), disabled: true}, [Validators.required]),
                allergies: new FormControl({value: "" + this.workerHealthCard.allergies, disabled: true}, [Validators.required]),
                discoloration: new FormControl({value: "" + this.workerHealthCard.discoloration.valueOf(), disabled: true}, [Validators.required]),
                infectiousDiseases: new FormControl({value: "" + this.workerHealthCard.infectiousDiseases.valueOf(), disabled: true}, [Validators.required]),
                bloodCirculationDisorders: new FormControl({value: "" + this.workerHealthCard.bloodCirculationDisorders.valueOf(), disabled: true}, [Validators.required]),
                herpes: new FormControl({value: "" + this.workerHealthCard.herpes.valueOf(), disabled: true}, [Validators.required]),
                fever: new FormControl({value: "" + this.workerHealthCard.fever.valueOf(), disabled: true}, [Validators.required]),
                pregnancy: new FormControl({value: "" + this.workerHealthCard.pregnancy.valueOf(), disabled: true}, [Validators.required]),
                weakness: new FormControl({value: "" + this.workerHealthCard.weakness.valueOf(), disabled: true}, [Validators.required])
            });
        }
    }

    public sumbit(): void {
        if (this.editMode) {
            this.workerHealthCard.pacemaker = this.workerHealthCardForm.value.pacemaker;
            this.workerHealthCard.hermophilia = this.workerHealthCardForm.value.hermophilia;
            this.workerHealthCard.psoriasis = this.workerHealthCardForm.value.psoriasis;
            this.workerHealthCard.allergies = this.workerHealthCardForm.value.allergies;
            this.workerHealthCard.discoloration = this.workerHealthCardForm.value.discoloration;
            this.workerHealthCard.infectiousDiseases = this.workerHealthCardForm.value.infectiousDiseases;
            this.workerHealthCard.herpes = this.workerHealthCardForm.value.herpes;
            this.workerHealthCard.bloodCirculationDisorders = this.workerHealthCardForm.value.bloodCirculationDisorders;
            this.workerHealthCard.herpes = this.workerHealthCardForm.value.herpes;
            this.workerHealthCard.fever = this.workerHealthCardForm.value.fever;
            this.workerHealthCard.pregnancy = this.workerHealthCardForm.value.pregnancy;
            this.workerHealthCard.weakness = this.workerHealthCardForm.value.weakness;
            this.workerHealthCard.needsUpdate = false;
            this._dialogRef.close(this.workerHealthCard);
        } else {
            this._dialogRef.close();
        }
    }

}
