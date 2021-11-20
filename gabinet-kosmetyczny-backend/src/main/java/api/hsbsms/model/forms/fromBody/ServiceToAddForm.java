package api.hsbsms.model.forms.fromBody;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ServiceToAddForm {
    String type;
    String name;
    String description;
    float price;
    int time;
    String advices;
}
