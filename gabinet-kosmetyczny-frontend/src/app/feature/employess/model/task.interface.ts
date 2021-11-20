export interface IWorkerTask {
    uuid?: string;
    title?: string;
    description?: string;
    dateFrom?: Date;
    dateTo?: Date;
    workerUuid?: string;
    workerName?: string;
    workerSurname?: string;
}
