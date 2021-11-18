import { IServicePromotion } from "./service-promotion.model";

export interface IServicePromotionWeek {
    mondayServicePromotions?: IServicePromotion[];
    tuesdayServicePromotions?: IServicePromotion[];
    wednesdayServicePromotions?: IServicePromotion[];
    thursdayServicePromotions?: IServicePromotion[];
    fridayServicePromotions?: IServicePromotion[];
}
