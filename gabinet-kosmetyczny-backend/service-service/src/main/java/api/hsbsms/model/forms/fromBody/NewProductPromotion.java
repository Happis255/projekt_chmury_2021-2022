package api.hsbsms.model.forms.fromBody;

import api.hsbsms.model.forms.toReturn.ProductRef;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class NewProductPromotion {

    String name;
    String description;
    Float price;
    Integer precent;
    Date dateFrom;
    Date dateTo;
    List<ProductRef> productList;
}
