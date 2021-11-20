package api.hsbsms.model.table;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "machine_report")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
public class MachineReport {

    @Id
    @NonNull
    private String uuid = UUID.randomUUID().toString();

    @NonNull
    private String title;

    private String description;

    @NonNull
    @Temporal(TemporalType.DATE)
    private Date date;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "worker_uuid")
    private Worker workerUuid;
}
