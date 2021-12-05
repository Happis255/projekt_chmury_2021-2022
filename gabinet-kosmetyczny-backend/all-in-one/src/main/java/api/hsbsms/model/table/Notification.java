package api.hsbsms.model.table;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "notification")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
public class Notification {

    @Id
    @NonNull
    private String uuid = UUID.randomUUID().toString();

    @ManyToOne
    @JoinColumn(name = "to_account_uuid")
    private Account toAccountUuid;

    @NonNull
    @Temporal(TemporalType.DATE)
    private Date date;

    @NonNull
    @Column(name = "notification_text")
    private String notificationText;

    @ManyToOne
    @JoinColumn(name = "from_account_uuid")
    private Account fromAccountUuid;

    @NonNull
    @Enumerated(EnumType.STRING)
    private Type type;

    public enum Type {
        FROM_CLIENT,
        FROM_USER,
        SYSTEM
    }

    @NonNull
    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        NOT_CONFIRMED,
        CONFIRMED,
        DELETED
    }
}
