package api.hsbsms.model.forms.fromBody;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ClientsMessages {

    String topic;
    String messageText;
    String[] uuid;
    String uuidFrom;
}
