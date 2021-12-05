package api.hsbsms.model.forms.toReturn;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ServiceRef {
    String uuid;
    String name;
    String type;
}
