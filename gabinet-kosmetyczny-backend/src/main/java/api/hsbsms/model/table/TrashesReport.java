package api.hsbsms.model.table;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "trashes_report")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
public class TrashesReport {

    @Id
    @NonNull
    private String uuid = UUID.randomUUID().toString();

    @NonNull
    private String title;

    @NonNull
    @Enumerated(EnumType.STRING)
    private TrashesReport.Type type;

    public enum Type {
        TYPE_150110,
        TYPE_150107,
        TYPE_150102,
        TYPE_160214,
        TYPE_180103
    }

    @NonNull
    @Temporal(TemporalType.DATE)
    private Date date;

    @NonNull
    private int amount;

    @NonNull
    private int cost;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "worker_uuid")
    private Worker workerUuid;
}
