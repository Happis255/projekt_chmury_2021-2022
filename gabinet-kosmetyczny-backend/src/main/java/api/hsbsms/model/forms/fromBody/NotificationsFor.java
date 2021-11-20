package api.hsbsms.model.forms.fromBody;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class NotificationsFor {

    @NonNull
    @JsonProperty("accountUuid")
    private String accountUuid;

    @NonNull
    @JsonProperty("profileUuid")
    private String profileUuid;

    @NonNull
    @JsonProperty("type")
    private String type;
}
