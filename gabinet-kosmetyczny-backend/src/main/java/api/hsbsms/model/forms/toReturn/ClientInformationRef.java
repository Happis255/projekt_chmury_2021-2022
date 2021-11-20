package api.hsbsms.model.forms.toReturn;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ClientInformationRef {
    private String clientUuid;
    private String accountUuid;
    private String name;
    private String surname;
}
