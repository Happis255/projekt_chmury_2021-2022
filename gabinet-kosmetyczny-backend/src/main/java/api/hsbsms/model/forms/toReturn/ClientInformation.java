package api.hsbsms.model.forms.toReturn;

import lombok.*;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ClientInformation {
    private String clientUuid;
    private String accountUuid;
    private String name;
    private String surname;
    private String street;
    private String code;
    private String town;
    private Date birthday;
    private String phone;
    private String email;
}
