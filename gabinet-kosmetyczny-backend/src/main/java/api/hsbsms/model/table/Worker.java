package api.hsbsms.model.table;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "worker")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
public class Worker {

    @Id
    @NonNull
    private String uuid = UUID.randomUUID().toString();

    @NonNull
    private String name;

    @NonNull
    private String surname;

    @NonNull
    private String street;

    @NonNull
    private String code;

    @NonNull
    private String town;

    @NonNull
    @Temporal(TemporalType.DATE)
    private Date birthday;

    @NonNull
    private String phone;

    @NonNull
    private String pesel;

    @NonNull
    @Column(name = "date_of_employment")
    @Temporal(TemporalType.DATE)
    private Date dateOfEmployment;

    private String certificates;

    @NonNull
    @Column(name = "is_active")
    private boolean isActive;

    @NonNull
    @OneToOne
    @JoinColumn(name = "account_uuid")
    private Account accountUuid;
}
