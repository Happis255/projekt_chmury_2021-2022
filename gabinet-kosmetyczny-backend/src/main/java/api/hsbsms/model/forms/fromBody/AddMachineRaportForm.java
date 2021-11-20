package api.hsbsms.model.forms.fromBody;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AddMachineRaportForm {
    private String title;
    private String description;
    private String workerUuid;
    private Date date;
}
