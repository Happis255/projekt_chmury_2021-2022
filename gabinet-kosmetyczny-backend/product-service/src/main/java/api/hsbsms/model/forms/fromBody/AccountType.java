package api.hsbsms.model.forms.fromBody;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AccountType {

    @NonNull
    private String role;
}
