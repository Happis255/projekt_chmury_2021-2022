import { IUnregisteredClient } from "./unregistered-client.model";

export interface INewVisitModel {
    workerUuid?: string;
    isItClient?: boolean;
    clientUuid?: string;
    unregisteredClient?: IUnregisteredClient;
    serviceUuid?: string;
    date?: Date;
    hour?: string;
}
