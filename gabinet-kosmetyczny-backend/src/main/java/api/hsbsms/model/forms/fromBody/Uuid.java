package api.hsbsms.model.forms.fromBody;
import lombok.*;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Uuid {

    @NonNull
    private String uuid = UUID.randomUUID().toString();
}
