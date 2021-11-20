package api.hsbsms.model.forms.fromBody;

import api.hsbsms.model.table.Absence;
import api.hsbsms.model.table.Account;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AbsenceChangeStatusForm {

    String uuid;
    Absence.Status status;
}
