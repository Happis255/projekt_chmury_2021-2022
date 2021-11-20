package api.hsbsms.model.forms.fromBody;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class VisitClientCreate {

    private String clientUuid;
    private String workerUuid;
    private String serviceUuid;
    private float price;
    private Date date;
    private String hour;
}
