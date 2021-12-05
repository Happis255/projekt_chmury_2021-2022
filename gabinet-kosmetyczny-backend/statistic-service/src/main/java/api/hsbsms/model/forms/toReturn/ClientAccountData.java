package api.hsbsms.model.forms.toReturn;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ClientAccountData {
    private String uuid;
    private String email;
    private String password;
    private String name;
    private String surname;
    private String street;
    private String code;
    private String town;
    private Date birthday;
    private String phone;
}
