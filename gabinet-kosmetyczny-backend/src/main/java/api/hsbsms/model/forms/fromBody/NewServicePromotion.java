package api.hsbsms.model.forms.fromBody;

import api.hsbsms.model.forms.toReturn.ServiceRef;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class NewServicePromotion {

    String name;
    String description;
    Float price;
    Integer precent;
    Date dateFrom;
    Date dateTo;
    List<ServiceRef> servicesList;
}
