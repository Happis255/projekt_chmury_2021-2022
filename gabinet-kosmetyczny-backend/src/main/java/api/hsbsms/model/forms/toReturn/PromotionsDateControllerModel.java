package api.hsbsms.model.forms.toReturn;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PromotionsDateControllerModel {
    String monthTitle;
    String todayDate;
    String mondayDate;
    String tuesdayDate;
    String wednesdayDate;
    String thursdayDate;
    String fridayDate;
}
