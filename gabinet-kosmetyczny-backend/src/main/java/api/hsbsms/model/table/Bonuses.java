package api.hsbsms.model.table;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "bonuses")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
public class Bonuses {

    @Id
    @NonNull
    private String uuid = UUID.randomUUID().toString();

    @NonNull
    private float amount;

    @NonNull
    @Temporal(TemporalType.DATE)
    @Column(name = "date_given")
    private Date dateGiven;

    @ManyToOne
    @JoinColumn(name = "worker_uuid")
    private Worker workerUuid;
}
