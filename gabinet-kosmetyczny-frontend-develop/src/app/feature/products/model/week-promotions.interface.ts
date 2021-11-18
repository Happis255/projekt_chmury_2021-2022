import { IProductPromotion } from "./product-promotion.model";

export interface IProductPromotionWeek {
    mondayProductPromotions?: IProductPromotion[];
    tuesdayProductPromotions?: IProductPromotion[];
    wednesdayProductPromotions?: IProductPromotion[];
    thursdayProductPromotions?: IProductPromotion[];
    fridayProductPromotions?: IProductPromotion[];
}
