import { NotificationStatus } from "./../enums/notification-status.enum";

export interface INotification {
    uuid: string;
    notificationText: string;
    status: NotificationStatus;
    date: Date;
    name?: string;
    surname?: string;
}
