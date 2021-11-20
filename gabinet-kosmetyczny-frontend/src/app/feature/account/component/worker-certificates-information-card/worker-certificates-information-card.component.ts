import { WorkerCertificationsEditModalComponent } from "./../worker-certifications-edit-modal/worker-certifications-edit-modal.component";
import { Component, EventEmitter, Input, OnChanges, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Output } from "@angular/core";

@Component({
    selector: "app-worker-certificates-information-card",
    templateUrl: "./worker-certificates-information-card.component.html",
    styleUrls: ["./worker-certificates-information-card.component.sass"]
})
export class WorkerCertificatesInformationCardComponent implements OnInit, OnChanges {

    @Input()
    public certificates: string;

    public certificationList: string[] = [];

    @Output()
    public certificatesEventEmitter = new EventEmitter<string>();

    constructor(
        private _dialog: MatDialog
    ) { }

    ngOnInit(): void {
        if (this.certificates) {
            this.certificationList = this.certificates.split(",");
        }
    }

    ngOnChanges(): void {
        if (this.certificates) {
            this.certificationList = this.certificates.split(",");
        }
    }

    public editCertificationsModal(): void {
        const dialogRef = this._dialog.open(WorkerCertificationsEditModalComponent, {
            maxWidth: "35em",
            disableClose: true
        });
        dialogRef.componentInstance.certificationListInString = this.certificates;
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
                if (result == true) {
                    result = "";
                }
                this.certificatesEventEmitter.emit(result);
            }
        });
    }
}
