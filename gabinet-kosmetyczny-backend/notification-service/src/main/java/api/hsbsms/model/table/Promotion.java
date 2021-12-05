package api.hsbsms.model.table;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "promotion")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
public class Promotion {

    @Id
    @NonNull
    private String uuid = UUID.randomUUID().toString();

    @NonNull
    private String name;

    private String description;

    @Nullable
    private Float price;

    @Nullable
    private Integer precent;

    @NonNull
    @Column(name = "date_from")
    @Temporal(TemporalType.DATE)
    private Date dateFrom;

    @NonNull
    @Column(name = "date_to")
    @Temporal(TemporalType.DATE)
    private Date dateTo;
}
