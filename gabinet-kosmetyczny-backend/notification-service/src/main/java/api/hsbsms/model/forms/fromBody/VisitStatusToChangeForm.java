package api.hsbsms.model.forms.fromBody;

import api.hsbsms.model.table.Absence;
import api.hsbsms.model.table.Appoitment;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class VisitStatusToChangeForm {

    String visitUuid;
    Appoitment.Status status;
}
