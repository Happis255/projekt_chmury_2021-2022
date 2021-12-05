package api.hsbsms.model.forms.toReturn;

import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductPromotionForm {
    String uuid;
    Date dateFrom;
    Date dateTo;
    String name;
    String description;
    Float price;
    Integer precent;
    List<ProductRef> productList = new ArrayList<>();
}
