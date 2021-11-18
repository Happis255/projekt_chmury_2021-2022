import { ABSENCE_STATUS } from "./enum/absence-status.enum";

export interface IAbsence {
    uuid?: string;
    dateFrom?: string;
    dateTo?: string;
    title?: string;
    reason?: string;
    workerUuid?: string;
    workerName?: string;
    workerSurname?: string;
    status?: ABSENCE_STATUS;
}
