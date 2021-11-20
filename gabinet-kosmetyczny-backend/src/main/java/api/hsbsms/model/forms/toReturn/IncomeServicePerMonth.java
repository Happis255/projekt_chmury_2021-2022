package api.hsbsms.model.forms.toReturn;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class IncomeServicePerMonth {

    @NonNull
    private long amount;

    @NonNull
    private String month;

    @NonNull
    private int year;
}
