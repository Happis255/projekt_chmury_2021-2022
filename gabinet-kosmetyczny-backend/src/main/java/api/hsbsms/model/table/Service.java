package api.hsbsms.model.table;

import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "service")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
public class Service {

    @Id
    @NonNull
    private String uuid = UUID.randomUUID().toString();

    @NonNull
    private Boolean active = true;

    @NonNull
    private String type;

    @NonNull
    private String name;

    private String description;

    @NonNull
    private float price;

    @NonNull
    private int time;

    private String advices;

    @ManyToOne
    @JoinColumn(name = "promotion_uuid")
    private Promotion promotionUuid;
}
