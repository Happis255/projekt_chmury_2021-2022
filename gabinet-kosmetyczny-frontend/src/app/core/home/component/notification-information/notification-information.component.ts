import { Component, Input, OnInit, ViewChild, AfterViewInit, OnChanges, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { TranslateService } from "@ngx-translate/core";
import { MessageBoxComponent } from "src/app/shared/message-box/component/message-box/message-box.component";
import { NotificationStatus } from "src/app/shared/models/enums/notification-status.enum";
import { INotification } from "src/app/shared/models/interface/notification.interface";

@Component({
    selector: "app-notification-information",
    templateUrl: "./notification-information.component.html",
    styleUrls: ["./notification-information.component.sass"]
})
export class NotificationInformationComponent implements OnInit, AfterViewInit, OnChanges {

    @ViewChild("MatSortSystem")
    public sortSystem: MatSort;

    @ViewChild("MatSortWorkers")
    public sortWorkers: MatSort;

    @ViewChild("MatSortClients")
    public sortClients: MatSort;

    @ViewChild("MatPagSystem")
    public pagSystem: MatPaginator;

    @ViewChild("MatPagWorkers")
    public pagWorkers: MatPaginator;

    @ViewChild("MatPagClients")
    public pagClients: MatPaginator;

    @Input()
    public isWorker = false;

    @Input()
    public systemNotifications: INotification[] = [];

    @Input()
    public userMesseges: INotification[] = [];

    @Input()
    public clientsMesseges: INotification[] = [];

    @Output()
    public deleteEmitter: EventEmitter<string> = new EventEmitter();

    @Output()
    public seenEmitter: EventEmitter<string> = new EventEmitter();

    public NOTIFICATION_STATUS: NotificationStatus;
    public tableSystemSource: MatTableDataSource<INotification>;
    public tableWorkersSource: MatTableDataSource<INotification>;
    public tableClientsSource: MatTableDataSource<INotification>;
    public tableSystemDisplayedColumns: string[] = ["notificationText", "date", "actions"];
    public tableNotiDisplayedColumns: string[] = ["name", "surname", "notificationText", "date", "actions"];

    constructor(
        private _translate: TranslateService,
        private _dialog: MatDialog
    ) { }

    public checkIfSeen(status: string): boolean {
        return status === "NOT_CONFIRMED";
    }

    public setAsDeleted(uuid: string): void {
        const message = this._translate.instant("shared.sure-to-delete");
        this._dialog.open(MessageBoxComponent, {
                data: {
                    message,
                    confirmButton: true,
                    cancelButton: true
                }
        }).afterClosed().subscribe(result => {
            if (result) {
                this.deleteEmitter.emit(uuid);
            }
        });
    }

    public setAsSeen(uuid: string): void {
        this.seenEmitter.emit(uuid);
    }

    ngOnInit(): void {
        this.tableSystemSource = new MatTableDataSource(this.systemNotifications);
        this.tableWorkersSource = new MatTableDataSource(this.userMesseges);
        this.tableClientsSource = new MatTableDataSource(this.clientsMesseges);
    }

    ngAfterViewInit(): void {
        this._reload();
    }

    ngOnChanges(): void {
        this.tableSystemSource = new MatTableDataSource(this.systemNotifications);
        this.tableWorkersSource = new MatTableDataSource(this.userMesseges);
        this.tableClientsSource = new MatTableDataSource(this.clientsMesseges);
        this._reload();
    }

    private _reload(): void {
        this.tableSystemSource.sort = this.sortSystem;
        this.tableWorkersSource.sort = this.sortWorkers;
        this.tableClientsSource.sort = this.sortClients;
        if (this.systemNotifications?.length > 0) {
            this.tableSystemSource.paginator = this.pagSystem;
        }
        if (this.userMesseges?.length > 0) {
            this.tableWorkersSource.paginator = this.pagWorkers;
        }
        if (this.clientsMesseges?.length > 0) {
            this.tableClientsSource.paginator = this.pagClients;
        }
    }

}
