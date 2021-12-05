package api.hsbsms.model.forms.toReturn;

import api.hsbsms.model.table.Promotion;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ServiceCategoryOffer {
    String name;
    String description;
    Float price;
    int time;
    Promotion promotion;
}
