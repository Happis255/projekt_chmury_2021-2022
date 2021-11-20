package api.hsbsms.model.table;

import lombok.*;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "product_for_sell")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
public class ProductForSell {

    @Id
    @NonNull
    private String uuid = UUID.randomUUID().toString();

    @NonNull
    private String name;

    private String description;

    @NonNull
    private float price;

    @NonNull
    private int amount;

    @ManyToOne
    @JoinColumn(name = "promotion_uuid")
    private Promotion promotionUuid;
}
