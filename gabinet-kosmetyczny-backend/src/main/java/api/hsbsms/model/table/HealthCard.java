package api.hsbsms.model.table;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "health_book")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
public class HealthCard {

    @Id
    @NonNull
    private String uuid = UUID.randomUUID().toString();

    @NonNull
    private boolean pacemaker;

    @NonNull
    private boolean hermophilia;

    @NonNull
    private boolean psoriasis;

    @NonNull
    private String allergies;

    @NonNull
    @Column(name = "infectious_diseases")
    private boolean infectiousDiseases;

    @NonNull
    private boolean discoloration;

    @NonNull
    @Column(name = "blood_circulation_disorders")
    private boolean bloodCirculationDisorders;

    @NonNull
    private boolean herpes;

    @NonNull
    private boolean fever;

    @NonNull
    private boolean pregnancy;

    @NonNull
    private boolean weakness;

    @ManyToOne
    @JoinColumn(name = "worker_uuid")
    private Worker workerUuid;

    @NonNull
    @Temporal(TemporalType.DATE)
    @Column(name = "edit_date")
    private Date editDate;
}
