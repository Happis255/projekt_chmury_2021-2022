package api.hsbsms.model.forms.toReturn;

import api.hsbsms.model.table.EventForWorkers;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EventForWorkersForm {

    private String uuid = UUID.randomUUID().toString();
    private EventForWorkers.Type type;
    private String name;
    private String description;
    private String street;
    private String code;
    private String town;
    private Date dateFrom;
    private Date dateTo;
    private float price;
    private List<WorkerRef> workerRefList;
}
