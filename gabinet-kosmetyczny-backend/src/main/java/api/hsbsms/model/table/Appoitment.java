package api.hsbsms.model.table;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "appointment")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
public class Appoitment {

    @Id
    @NonNull
    private String uuid = UUID.randomUUID().toString();

    @NonNull
    @Temporal(TemporalType.DATE)
    private Date date;

    @NonNull
    @Temporal(TemporalType.TIME)
    private Date hour;

    @NonNull
    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        TO_ACCEPT,
        REJECTED,
        CONFIRMED,
        FINISHED,
        CANCELLED
    }

    @NonNull
    @ManyToOne
    @JoinColumn(name = "worker_uuid")
    private Worker workerUuid;

    @ManyToOne
    @JoinColumn(name = "client_uuid")
    private Client clientUuid;

    @ManyToOne
    @JoinColumn(name = "unregistered_client_uuid")
    private UnregisteredClient unregisteredClientUuid;

    @ManyToOne
    @JoinColumn(name = "service_uuid")
    private Service serviceUuid;

    @NonNull
    private float price;
}

