import { IServiceRef } from "./service-ref.model";

export interface IServicePromotion {
    uuid?: string;
    name?: string;
    description?: string;
    price?: number;
    precent?: number;
    dateFrom?: Date;
    dateTo?: Date;
    servicesList?: IServiceRef[];
}
