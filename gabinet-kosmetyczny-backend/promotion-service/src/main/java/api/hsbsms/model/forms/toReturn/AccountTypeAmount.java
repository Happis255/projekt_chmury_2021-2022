package api.hsbsms.model.forms.toReturn;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AccountTypeAmount {

    @NonNull
    private long amount;
}
