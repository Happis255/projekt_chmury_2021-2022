package api.hsbsms.model.table;
import lombok.*;
import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "account")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
public class Account {

    @Id
    @NonNull
    private String uuid = UUID.randomUUID().toString();

    @NonNull
    @Column(name = "e_mail")
    private String email;

    @NonNull
    private String password;

    @NonNull
    @Enumerated(EnumType.STRING)
    private Role role;

    @NonNull
    @Column(name = "is_active")
    private boolean isActive;

    public enum Role {
        CLIENT,
        WORKER,
        ADMIN
    }
}
