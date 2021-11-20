package api.hsbsms.model.forms.toReturn;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class IncomeServicePerWorker {

    @NonNull
    private long amount;

    @NonNull
    private String name;

    @NonNull
    private String surname;
}
