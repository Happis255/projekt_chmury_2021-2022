package api.hsbsms.model.forms.fromBody;

import api.hsbsms.model.table.TrashesReport;
import lombok.*;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AddTrashesRaportForm {
    private String title;
    private String workerUuid;
    private Date date;
    private int cost;
    private int amount;
    private TrashesReport.Type type;
}
