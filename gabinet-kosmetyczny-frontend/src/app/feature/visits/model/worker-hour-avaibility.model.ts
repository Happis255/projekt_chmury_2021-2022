import { IHourAvailabilityList } from "./hour-availability-list.model";

export interface IWorkerHourAvaibility {
    workerUuid: string;
    workerName: string;
    workerSurname: string;
    hourAvailabilityList: IHourAvailabilityList[];
}
