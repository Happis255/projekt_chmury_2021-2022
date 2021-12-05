package api.hsbsms.model.table;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "absence")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
public class Absence {

    @Id
    @NonNull
    private String uuid = UUID.randomUUID().toString();

    @NonNull
    @Column(name = "date_from")
    @Temporal(TemporalType.DATE)
    private Date dateFrom;

    @NonNull
    @Column(name = "date_to")
    @Temporal(TemporalType.DATE)
    private Date dateTo;

    @NonNull
    private String title;


    @NonNull
    private String reason;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "worker_uuid")
    private Worker workerUuid;

    @NonNull
    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        NOT_CONFIRMED,
        CONFIRMED,
        REJECTED
    }
}
