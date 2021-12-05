package api.hsbsms.model.forms.fromBody;

import api.hsbsms.model.table.Account;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EditClientForm {
    private String accountUuid;
    private String clientUuid;
    private String name;
    private String surname;
    private String street;
    private String code;
    private String town;
    private Date birthday;
    private String phone;
    private String email;
    private String password;
}
