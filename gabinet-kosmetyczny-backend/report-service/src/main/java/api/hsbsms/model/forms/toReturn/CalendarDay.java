package api.hsbsms.model.forms.toReturn;

import api.hsbsms.model.table.Appoitment;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CalendarDay {
    public boolean isAppoitment;
    public String visitUuid;
    public String time;
    public boolean isClientRegistered;
    public ClientRef clientRef;
    public UnregisteredClientRef unregisteredClientRef;
    public ServiceRef serviceRef;
    public WorkerRef workerRef;
    public int widthTimes;
    public Appoitment.Status status;
    public float price;
}
