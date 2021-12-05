package api.hsbsms.model.forms.fromBody;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UnregisteredClientNew {

    String name;
    String surname;
    String phone;
    String eMail;
}
