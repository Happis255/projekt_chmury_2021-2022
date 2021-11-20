package api.hsbsms.model.forms.toReturn;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AbsenceInformation {
    String uuid;
    Date dateFrom;
    Date dateTo;
    String title;
    String reason;
    String workerUuid;
    String workerName;
    String workerSurname;
    String status;
}
