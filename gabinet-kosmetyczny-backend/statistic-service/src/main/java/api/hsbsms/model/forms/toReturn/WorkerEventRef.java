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
public class WorkerEventRef {

    private String workerUuid;
    private String eventUuid;
}
