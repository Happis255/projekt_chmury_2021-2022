package api.hsbsms.model.forms.toReturn;

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
public class ClientRef {

    private String uuid;
    private String name;
    private String surname;
    private String phone;
}
