package api.hsbsms.model.table;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "event_for_workers")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
public class EventForWorkers {

    @Id
    @NonNull
    private String uuid = UUID.randomUUID().toString();

    @NonNull
    @Enumerated(EnumType.STRING)
    private EventForWorkers.Type type;

    public enum Type {
        CONGRESS,
        TRAINING,
        COSMETICS_TRADE_FAIR
    }

    @NonNull
    private String name;

    private String description;

    @NonNull
    private String street;

    @NonNull
    private String code;

    @NonNull
    private String town;

    @NonNull
    @Column(name="date_from")
    @Temporal(TemporalType.DATE)
    private Date dateFrom;

    @NonNull
    @Column(name="date_to")
    @Temporal(TemporalType.DATE)
    private Date dateTo;

    @NonNull
    private float price;
}
