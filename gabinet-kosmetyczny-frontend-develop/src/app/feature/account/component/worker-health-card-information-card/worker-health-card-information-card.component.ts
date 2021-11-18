import { IWorkerHealthCard } from "./../../model/worker-health-card.interface";
import { WorkerHealthCardEditModalComponent } from "./../worker-health-card-edit-modal/worker-health-card-edit-modal.component";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: "app-worker-health-card-information-card",
    templateUrl: "./worker-health-card-information-card.component.html",
    styleUrls: ["./worker-health-card-information-card.component.sass"]
})
export class WorkerHealthCardInformationCardComponent implements OnInit {

    @Input()
    public workerHealthCard: IWorkerHealthCard;

    @Output()
    public workerHealthCardEventEmitter = new EventEmitter<IWorkerHealthCard>();

    constructor(
        private _dialog: MatDialog
    ) { }

    ngOnInit(): void {
    }

    public workerEditHealthCard(): void {
        const dialogRef = this._dialog.open(WorkerHealthCardEditModalComponent, {
            maxWidth: "35em",
            disableClose: true
        });
        dialogRef.componentInstance.workerHealthCard = this.workerHealthCard;
        dialogRef.afterClosed().subscribe((result: IWorkerHealthCard) => {
            if (result) {
                this.workerHealthCardEventEmitter.emit(result);
            }
        });
    }
}
