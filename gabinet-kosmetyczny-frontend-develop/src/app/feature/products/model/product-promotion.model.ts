import { IProductRef } from "./product-ref.model";

export interface IProductPromotion {
    uuid?: string;
    name?: string;
    description?: string;
    price?: number;
    precent?: number;
    dateFrom?: Date;
    dateTo?: Date;
    productList?: IProductRef[];
}
