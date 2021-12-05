package api.hsbsms.model.forms.toReturn;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EquipmentToReturnForm {

    private String uuid;
    private String name;
    private String description;
    private Date getDate;
    private Date warrantyDate;
    private Date lastCheckDate;
    private String comments;
    private boolean toCheck;
}
