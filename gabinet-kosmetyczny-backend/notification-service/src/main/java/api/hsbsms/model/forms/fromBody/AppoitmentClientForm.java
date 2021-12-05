package api.hsbsms.model.forms.fromBody;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AppoitmentClientForm {

    @NonNull
    @JsonProperty("date")
    private Date date;

    @NonNull
    @JsonProperty("serviceUuid")
    private String serviceUuid;
}
