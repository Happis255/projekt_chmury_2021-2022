package api.hsbsms.model.forms.toReturn;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UnregisteredClientRef {

    private String uuid;
    private String name;
    private String surname;
    private String phone;
}
