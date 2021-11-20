package api.hsbsms.model.table;

import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "unregistered_client")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
public class UnregisteredClient {

    @Id
    @NonNull
    private String uuid = UUID.randomUUID().toString();

    @NonNull
    private String name;

    @NonNull
    private String surname;

    @NonNull
    private String phone;

    @NonNull
    @Column(name = "e_mail")
    private String eMail;
}
