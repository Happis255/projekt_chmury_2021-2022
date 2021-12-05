package api.hsbsms.model.forms.fromBody;

import api.hsbsms.model.table.Account;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AddClientForm {
    private String accountUuid = UUID.randomUUID().toString();
    private String clientUuid = UUID.randomUUID().toString();
    private String name;
    private String surname;
    private String street;
    private String code;
    private String town;
    private Date birthday;
    private String phone;
    private String email;
    private String password;
    private Account.Role role = Account.Role.CLIENT;
    private boolean isActive = true;
}
