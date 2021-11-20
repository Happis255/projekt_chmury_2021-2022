package api.hsbsms.model.forms.toReturn;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class NotificationSystem {

    @NonNull
    private String uuid;

    @NonNull
    private String notificationText;

    @NonNull
    private String status;

    @NonNull
    private Date date;
}
