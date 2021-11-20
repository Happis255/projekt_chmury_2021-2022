package api.hsbsms.model.table;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "equipment")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
public class Equipment {

    @Id
    @NonNull
    private String uuid = UUID.randomUUID().toString();

    @NonNull
    private String name;

    private String description;

    @NonNull
    @Column(name = "get_date")
    @Temporal(TemporalType.DATE)
    private Date getDate;

    @NonNull
    @Column(name = "warranty_date")
    @Temporal(TemporalType.DATE)
    private Date warrantyDate;

    @NonNull
    @Column(name = "last_check_date")
    @Temporal(TemporalType.DATE)
    private Date lastCheckDate;

    private String comments;
}
