import { Component, Input, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-worker-certifications-edit-modal",
    templateUrl: "./worker-certifications-edit-modal.component.html",
    styleUrls: ["./worker-certifications-edit-modal.component.sass"]
})
export class WorkerCertificationsEditModalComponent implements OnInit {

    @Input()
    public certificationListInString: string;

    @Input()
    public editMode = true;

    constructor(
        private _dialogRef: MatDialogRef<WorkerCertificationsEditModalComponent>
    ) { }

    ngOnInit(): void {}

    public sumbit(): void {
        if (this.editMode) {
            if (this.certificationListInString) {
                this._dialogRef.close(this.certificationListInString);
            } else {
                this._dialogRef.close(true);
            }
        } else {
            this._dialogRef.close();
        }
    }
}
