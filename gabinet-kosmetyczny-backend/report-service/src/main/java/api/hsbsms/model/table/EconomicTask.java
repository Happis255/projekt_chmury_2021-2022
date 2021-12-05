package api.hsbsms.model.table;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "economic_task")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
public class EconomicTask {

    @Id
    @NonNull
    private String uuid = UUID.randomUUID().toString();

    @NonNull
    private String title;

    private String description;

    @NonNull
    @Temporal(TemporalType.DATE)
    @Column(name = "date_from")
    private Date dateFrom;

    @NonNull
    @Temporal(TemporalType.DATE)
    @Column(name = "date_to")
    private Date dateTo;

    @ManyToOne
    @JoinColumn(name = "worker_uuid")
    private Worker workerUuid;
}

