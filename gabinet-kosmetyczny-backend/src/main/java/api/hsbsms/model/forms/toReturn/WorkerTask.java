package api.hsbsms.model.forms.toReturn;

import lombok.*;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class WorkerTask {

    private String uuid;
    private String title;
    private String description;
    private Date dateFrom;
    private Date dateTo;
    private String workerUuid;
    private String workerName;
    private String workerSurname;
}
