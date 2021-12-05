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
public class ServiceCategory {
    String categoryName;
    List<ServiceCategoryOffer> services = new ArrayList<>();
}
