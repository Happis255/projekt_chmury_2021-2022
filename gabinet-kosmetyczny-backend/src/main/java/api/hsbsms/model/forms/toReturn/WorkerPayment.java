package api.hsbsms.model.forms.toReturn;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class WorkerPayment {

    private String uuid;
    float amount;
    float bonus;
}
