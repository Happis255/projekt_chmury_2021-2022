import { INewClientMessage } from "./../../model/client-message.interface";
import { ClientSendMessageComponent } from "./../../component/client-send-message/client-send-message.component";
import { ClientViewModalComponent } from "./../../component/client-view-modal/client-view-modal.component";
import { ClientEditModalComponent } from "./../../component/client-edit-modal/client-edit-modal.component";
import { ClientAddModalComponent } from "./../../component/client-add-modal/client-add-modal.component";
import { Subscription } from "rxjs";
import { ClientFacade } from "./../../client.facade";
import { IClientData } from "./../../model/client.model";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { MessageBoxComponent } from "src/app/shared/message-box/component/message-box/message-box.component";

@Component({
    selector: "app-clients",
    templateUrl: "./clients.component.html",
    styleUrls: ["./clients.component.sass"]
})
export class ClientsComponent implements OnInit {

    public clientList: IClientData[] = [];
    public clientListTemp: IClientData[] = [];
    public clientListSubscription: Subscription;
    public isDialogClosed = true;
    public emailsSubscription: Subscription;

    constructor(
        private _clientFacade: ClientFacade,
        private _dialog: MatDialog,
        private _translate: TranslateService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._clientFacade.loadClientList();
        this.clientListSubscription = this._clientFacade.getClientList()
            .subscribe((clientList: IClientData[]) => {
                if (clientList) {
                    this.clientList = clientList;
                    this.clientListTemp = this.clientList;
                }
            });
        this._checkUrlIfToOpenModal();
    }

    private _checkUrlIfToOpenModal(): void {
        if (this._router.url.includes("add-new")) {
            this.addClient();
        }
    }

    public sortList(filter: IClientData): void {
        if (filter.name || filter.surname) {
            this.clientList = this.clientListTemp;
            this.clientList = this.clientList.filter((client: IClientData) => {
                if (filter.name && filter.surname) {
                    return client.name.toLowerCase().includes(filter.name.toLowerCase()) &&
                        client.surname.toLowerCase().includes(filter.surname.toLowerCase());
                }
                if (filter.name) {
                    return (client.name.toLowerCase().includes(filter.name.toLowerCase()));
                }
                if (filter.surname) {
                    return (client.surname.toLowerCase().includes(filter.surname.toLowerCase()));
                }
            });
        } else {
            this._clientFacade.loadClientList();
        }
    }

    public addClient(): void {
        this._clientFacade.loadEmails();
        this.emailsSubscription = this._clientFacade.getEmails().subscribe((emails: string[]) => {
            if (emails && this.isDialogClosed) {
                this.isDialogClosed = false;
                const dialogRef = this._dialog.open(ClientAddModalComponent, {
                    disableClose: true
                });
                dialogRef.componentInstance.emails = emails;
                dialogRef.afterClosed().subscribe((result: IClientData) => {
                    if (result) {
                        this._clientFacade.addClient(result);
                    }
                    this.isDialogClosed = true;
                    this.emailsSubscription.unsubscribe();
                });
            }
        });
    }

    public editClient(client: IClientData): void {
        this._clientFacade.loadEmails();
        this.emailsSubscription = this._clientFacade.getEmails().subscribe((emails: string[]) => {
            if (emails && this.isDialogClosed) {
                this.isDialogClosed = false;
                const dialogRef = this._dialog.open(ClientEditModalComponent, {
                    disableClose: true
                });
                dialogRef.componentInstance.clientToEdit = client;
                dialogRef.componentInstance.emails = emails;
                dialogRef.afterClosed().subscribe((result: IClientData) => {
                    if (result) {
                        this._clientFacade.editClient(result);
                    }
                    this.isDialogClosed = true;
                    this.emailsSubscription.unsubscribe();
                });
            }
        });
    }

    public viewClient($event: Event, client: IClientData): void {
        $event.stopPropagation();
        if (this.isDialogClosed) {
            this.isDialogClosed = false;
            const dialogRef = this._dialog.open(ClientViewModalComponent, {
                disableClose: true
            });
            dialogRef.componentInstance.clientToView = client;
            dialogRef.afterClosed().subscribe(() => {
                this.isDialogClosed = true;
            });
        }
    }

    public removeClient(client: IClientData): void {
        const message = this._translate.instant("shared.delete-client");
        this._dialog.open(MessageBoxComponent, {
            data: {
                message,
                confirmButton: true,
                cancelButton: true
            }
        }).afterClosed().subscribe(result => {
            if (result) {
                this._clientFacade.removeClient(client.clientUuid);
            }
        });
    }

    public sendMessage(): void {
        const dialogRef = this._dialog.open(ClientSendMessageComponent, {
            maxWidth: "35em",
            disableClose: true
        });
        dialogRef.componentInstance.clientsList = this.clientList;
        dialogRef.afterClosed().subscribe((message: INewClientMessage) => {
            if (message) {
                message.uuidFrom = this._clientFacade.getUserData().accountUuid;
                console.log(message);
                this._clientFacade.sendMessagesClients(message);
            }
        });
    }
}
