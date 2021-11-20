package api.hsbsms.model.forms.fromBody;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LoginForm {

    @NonNull
    @JsonProperty("email")
    private String email;

    @NonNull
    @JsonProperty("password")
    private String password;
}
