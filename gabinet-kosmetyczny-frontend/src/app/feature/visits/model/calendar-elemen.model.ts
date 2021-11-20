import { Time } from "@angular/common";
import { IRegisteredClientRef } from "./registered-client-ref.model";
import { IServiceRef } from "./service-ref.model";
import { IUnregisteredClientRef } from "./unregistered-client-ref.model";
import { IWorkerRef } from "./worker-ref.model";

export interface ICalendarElement {
    isAppoitment?: boolean;
    visitUuid?: string;
    time?: string;
    to?: Time;
    isClientRegistered?: boolean;
    clientRef?: IRegisteredClientRef;
    unregisteredClientRef?: IUnregisteredClientRef;
    serviceRef?: IServiceRef;
    workerRef?: IWorkerRef;
    widthTimes?: number;
    status?: string;
    price?: number;
}
