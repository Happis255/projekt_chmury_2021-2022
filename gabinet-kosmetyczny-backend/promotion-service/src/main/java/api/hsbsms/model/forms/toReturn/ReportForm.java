package api.hsbsms.model.forms.toReturn;

import lombok.*;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ReportForm {

    private String uuid = UUID.randomUUID().toString();
    private String type;
    private String title;
    private String description;
    private Date date;
    private String workerUuid;
    private String name;
    private String surname;
}
