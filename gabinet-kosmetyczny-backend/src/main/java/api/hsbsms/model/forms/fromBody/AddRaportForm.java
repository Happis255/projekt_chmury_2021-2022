package api.hsbsms.model.forms.fromBody;

import api.hsbsms.model.table.Report;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AddRaportForm {
    private String title;
    private String description;
    private String workerUuid;
    private Date date;
    private Report.Type type;
}
