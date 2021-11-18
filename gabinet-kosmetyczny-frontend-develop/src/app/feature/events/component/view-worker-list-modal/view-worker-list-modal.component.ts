import { IWorkerRef } from "./../../../visits/model/worker-ref.model";
import { IEvent } from "./../../model/event.model";
import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector: "app-view-worker-list-modal",
    templateUrl: "./view-worker-list-modal.component.html",
    styleUrls: ["./view-worker-list-modal.component.sass"]
})
export class ViewWorkerListModalComponent implements OnInit, AfterViewInit {

    @Input()
    public event: IEvent;

    @ViewChild("MatSort")
    public matSort: MatSort;

    @ViewChild("MatPag")
    public matPag: MatPaginator;

    public tableDisplayedColumns: string[] = ["name", "surname"];
    public tableSource: MatTableDataSource<IWorkerRef>;

    constructor() { }

    ngOnInit(): void {
        this.tableSource = new MatTableDataSource(this.event.workerRefList);
    }

    ngAfterViewInit(): void {
        this.tableSource.sort = this.matSort;
        this.tableSource.paginator = this.matPag;
    }
}
