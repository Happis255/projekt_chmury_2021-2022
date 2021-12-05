package api.hsbsms.model.forms.toReturn;

import api.hsbsms.model.table.Promotion;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ServiceRefWithPromo {
    String uuid;
    String name;
    float price;
    int time;
    String type;
    Promotion promotion;
}
