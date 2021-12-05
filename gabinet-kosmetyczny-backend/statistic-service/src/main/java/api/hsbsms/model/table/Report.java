package api.hsbsms.model.table;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "report")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
public class Report {

    @Id
    @NonNull
    private String uuid = UUID.randomUUID().toString();

    @NonNull
    @Enumerated(EnumType.STRING)
    private Type type;

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

    public enum Type {
        SPORALA,
        KONTROLA_STACJI_SANITARNO_EPIDEMIOLOGICZNEJ
    }
}
