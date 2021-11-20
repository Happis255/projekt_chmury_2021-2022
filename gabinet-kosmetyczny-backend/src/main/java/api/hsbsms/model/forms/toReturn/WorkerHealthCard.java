package api.hsbsms.model.forms.toReturn;

import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class WorkerHealthCard {

    private String uuid;
    private boolean pacemaker;
    private boolean hermophilia;
    private boolean psoriasis;
    private String allergies;
    private boolean discoloration;
    private boolean infectiousDiseases;
    private boolean bloodCirculationDisorders;
    private boolean herpes;
    private boolean fever;
    private boolean pregnancy;
    private boolean weakness;
    private boolean needsUpdate;
}
