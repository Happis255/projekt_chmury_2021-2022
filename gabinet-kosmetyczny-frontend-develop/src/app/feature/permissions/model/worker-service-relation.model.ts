import { IServiceRef } from "./../../services/model/service-ref.model";
import { IWrokerRef } from "./worker-ref.model";

export interface IWorkerServiceRelation {
    serviceRef: IServiceRef[];
    workerRef: IWrokerRef;
}
