package api.hsbsms.model.forms.fromBody;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class NewAppointmentBody {

    private Boolean isItClient;
    private String serviceUuid;
    private String workerUuid;
    private String clientUuid;
    private UnregisteredClientNew unregisteredClient;
    private Date date;
    private String hour;
}
