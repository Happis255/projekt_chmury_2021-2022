package api.hsbsms.model.forms.toReturn;

import api.hsbsms.model.table.TrashesReport;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TrashesReportForm {

    private String uuid = UUID.randomUUID().toString();
    private String title;
    private Date date;
    private String workerUuid;
    private String name;
    private String surname;
    private TrashesReport.Type type;
    private int amount;
    private int cost;
}
