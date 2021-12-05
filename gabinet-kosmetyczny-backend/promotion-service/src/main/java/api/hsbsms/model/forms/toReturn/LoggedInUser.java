package api.hsbsms.model.forms.toReturn;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LoggedInUser {

    @NonNull
    private String userUuid;

    @NonNull
    private String accountUuid;

    @NonNull
    private String email;

    @NonNull
    private String role;

    @NonNull
    private String name;

    @NonNull
    private String surname;
}
