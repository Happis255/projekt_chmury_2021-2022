import { IWorkerRef } from "./../../visits/model/worker-ref.model";

export interface IEvent {
    uuid?: string;
    type?: string;
    name?: string;
    description?: string;
    street?: string;
    code?: string;
    town?: string;
    dateFrom?: Date;
    dateTo?: Date;
    price?: number;
    workerRefList?: IWorkerRef[];
}