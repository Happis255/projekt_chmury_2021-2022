package api.hsbsms.model.forms.fromBody;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class WorkersMessages {

    String topic;
    String messageText;
    String[] uuid;
    String uuidFrom;
}
