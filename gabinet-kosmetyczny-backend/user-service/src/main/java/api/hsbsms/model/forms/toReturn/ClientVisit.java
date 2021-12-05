package api.hsbsms.model.forms.toReturn;

import api.hsbsms.model.table.Appoitment;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ClientVisit {
    public String visitUuid;
    public String time;
    public Date date;
    public ClientRef clientRef;
    public ServiceRef serviceRef;
    public WorkerRef workerRef;
    public Appoitment.Status status;
    public float price;
}
